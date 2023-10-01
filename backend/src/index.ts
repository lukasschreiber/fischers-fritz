import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
import { JSDOM } from "jsdom";
import {
  GoogleReviewResponseType,
  Review,
  ReviewDetail,
  ReviewResponseType,
} from "@fischers-fritz/types";

dotenv.config();
const app = express();
const port = 3000;
app.use(cors());

const reviews: Review[] = [];
let reviewsUpdated = 0;

const reviewsNeedUpdate = () => {
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - reviewsUpdated;
  const millisecondsIn24Hours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  return timeDifference > millisecondsIn24Hours;
};

const formDataBody = (data: object) => {
  return Object.keys(data)
    .map(
      (key) =>
        encodeURIComponent(key) +
        "=" +
        encodeURIComponent(data[key as keyof typeof data])
    )
    .join("&");
};

const parseGermanDate = (date: string): number => {
  // Split the date string into day, month, and year
  const [day, month, year] = date.split(".").map(Number);
  const dateObject = new Date(year, month - 1, day);
  return dateObject.getTime() / 1000;
};

app.get("/reviews", async (req, res) => {
  try {
    if (reviewsNeedUpdate()) {
      const fetchedReviews: Review[] = [];

      // get Updates from Google
      const googleAPI = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.GOOGLE_PLACE_ID}&fields=reviews&key=${process.env.GOOGLE_API_KEY}&language=de`;
      const response = await fetch(googleAPI);
      const data = (await response.json()) as GoogleReviewResponseType;

      fetchedReviews.push(
        ...data.result.reviews.map((review) => ({
          authorName: review.author_name,
          rating: review.rating,
          text: review.text,
          time: review.time,
          profileImage: review.profile_photo_url,
          relativeTimeDescription: review.relative_time_description,
          source: "google" as const
        }))
      );

      // get Updates from Greetsiel Apartments
      let hasMore = true;
      let index = 0;
      while (hasMore) {
        const respone = await fetch(
          "https://www.apartments-greetsiel.de/system/modules/fewomanager/FewoAjax.php",
          {
            method: "POST",
            body: formDataBody({
              alias: "fischers-fritz",
              start: index,
              mid: 121,
              action: "fewoVotingData",
            }),
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
        fetchedReviews.push({
          authorName:
            dom.window.document.querySelector(".fewo_voting_author")
              ?.textContent ?? "",
          time: parseGermanDate(
            dom.window.document.querySelector(".fewo_voting_date")
              ?.textContent ?? "01.01.1970"
          ),
          rating: parseFloat(
            dom.window.document.querySelector(".vote_number")?.textContent ??
              "0.0"
          ),
          text:
            dom.window.document.querySelector(".fewo_voting_message")
              ?.textContent ?? "",
          title:
            dom.window.document.querySelector(".fewo_voting_headline")
              ?.textContent ?? undefined,
          relativeTimeDescription: "",
          profileImage: undefined,
          source: "greetsiel-apartments",
          details: Array.from(dom.window.document.querySelectorAll(".fewo_voting_scoredetails > div")).map(element => ({
            label: element.querySelector(".voteoption_label")?.textContent,
            rating: parseInt(element.querySelector(".voteoption_value")?.textContent ?? "0")
          } as ReviewDetail))
        });

        if (!data.more) hasMore = false;
        index++;
      }

      // cache for later use
      reviewsUpdated = new Date().getTime();
      reviews.push(...fetchedReviews.sort((a, b) => {
        if(b.rating === a.rating) return b.text.length - a.text.length;
        return b.rating - a.rating
      }));
    }

    res.json({ result: reviews } as ReviewResponseType);
  } catch (error) {
    res.status(500).json({ error: "Proxy error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
