import {
  GoogleReviewResponseType,
  Review,
  ReviewDetail,
} from "@fischers-fritz/types";
import * as Cache from "./utils/cache";
import { JSDOM } from "jsdom";
import { parseGermanDate } from "./utils/utils";
import { getKeywords } from "./python/keywords";

export async function getGoogleReviews(): Promise<Review[]> {
  return new Promise<Review[]>(async (resolve) => {
    const cacheEntry = Cache.get<Review[]>("google");
    if (cacheEntry !== undefined) return resolve(cacheEntry);

    const googleAPI = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.GOOGLE_PLACE_ID}&fields=reviews&key=${process.env.GOOGLE_API_KEY}&language=de`;
    const response = await fetch(googleAPI);
    const data = (await response.json()) as GoogleReviewResponseType;

    const reviews = await Promise.all(
      data.result.reviews.map(async (review) => {
        const text = review.text.replace(/\n/g, " ").replace("  ", " ");
        return {
          authorName: review.author_name,
          rating: review.rating,
          text: text,
          keywords: await getKeywords(text),
          time: review.time,
          profileImage: review.profile_photo_url,
          relativeTimeDescription: review.relative_time_description,
          source: "google" as const,
        };
      })
    );

    Cache.store<Review[]>(reviews, "google");
    resolve(reviews);
  });
}

export async function getFeWoReviews(): Promise<Review[]> {
  return new Promise<Review[]>(async (resolve) => {
    const cacheEntry = Cache.get<Review[]>("fewo");
    if (cacheEntry !== undefined) return resolve(cacheEntry);

    const results: Review[] = [];
    let hasMore = true;
    let index = 0;
    while (hasMore) {
      const respone = await fetch(
        "https://www.apartments-greetsiel.de/system/modules/fewomanager/FewoAjax.php",
        {
          method: "POST",
          body: `alias=fischers-fritz&start=${index}&mid=121&action=fewoVotingData`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
        }
      );
      const data = (await respone.json()) as {
        votings: string[];
        more: boolean;
      };

      const dom = new JSDOM(data.votings[0]);
      const getElement = (className: string, fallback: string = "") =>
        dom.window.document.querySelector(`.${className}`)?.textContent ??
        fallback;

      const text = getElement("fewo_voting_message")
        .replace(/^(\n+ *)|(\n+ *)$/gm, "")
        .replace(/\n/g, " ").replace("  ", " ");
      const keywords = await getKeywords(text);

      results.push({
        authorName: getElement("fewo_voting_author"),
        time: parseGermanDate(getElement("fewo_voting_date", "01.01.1970")),
        rating: parseFloat(getElement("vote_number", "0.0").replace(",", ".")),
        text: text,
        keywords: keywords,
        title: getElement("fewo_voting_headline"),
        relativeTimeDescription: "",
        profileImage: undefined,
        source: "greetsiel-apartments",
        details: Array.from(
          dom.window.document.querySelectorAll(
            ".fewo_voting_scoredetails > div"
          )
        ).map(
          (element) =>
            ({
              label: element.querySelector(".voteoption_label")?.textContent,
              rating: parseInt(
                element.querySelector(".voteoption_value")?.textContent ?? "0"
              ),
            } as ReviewDetail)
        ),
      });

      if (!data.more) hasMore = false;
      index++;
    }

    Cache.store<Review[]>(results, "fewo");
    resolve(results);
  });
}
