import { GoogleReviewResponseType, Review, ReviewDetail } from "@fischers-fritz/types";
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
        const cacheEntry = Cache.get<Review[]>("greetsiel-apartments");
        if (cacheEntry !== undefined) return resolve(cacheEntry);

        const results: Review[] = [];
        let hasMore = true;
        let index = 0;
        while (hasMore) {
            const data = (await fetch("https://www.apartments-greetsiel.de/system/modules/fewomanager/FewoAjax.php", {
                method: "POST",
                body: `alias=fischers-fritz&start=${index}&mid=121&action=fewoVotingData`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                },
            }).then((body) => body.json()).catch((e: unknown) => console.log(e))) as {
                votings: string[];
                more: boolean;
            };

            const dom = new JSDOM(data.votings[0]);
            const getElement = (className: string, fallback: string = "") =>
                dom.window.document.querySelector(`.${className}`)?.textContent ?? fallback;

            const text = getElement("fewo_voting_message")
                .replace(/^(\n+ *)|(\n+ *)$/gm, "")
                .replace(/\n/g, " ")
                .replace("  ", " ");
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
                details: Array.from(dom.window.document.querySelectorAll(".fewo_voting_scoredetails > div")).map(
                    (element) =>
                        ({
                            label: element.querySelector(".voteoption_label")?.textContent,
                            rating: parseInt(element.querySelector(".voteoption_value")?.textContent ?? "0"),
                        } as ReviewDetail)
                ),
            });

            console.log(data.more, index, getElement("fewo_voting_author"));
            if (!data.more) hasMore = false;
            index++;
        }

        Cache.store<Review[]>(results, "greetsiel-apartments");
        resolve(results);
    });
}

// export async function getFeWoDirectReviews(): Promise<Review[]> {
//     return new Promise<Review[]>(async (resolve) => {
//         const cacheEntry = Cache.get<Review[]>("fewo-direct");
//         if (cacheEntry !== undefined) return resolve(cacheEntry);

//         const results: Review[] = [];

//         // myHeaders.append(
//         //     "Cookie",
//         //     "DUAID=3760ddc2-b9ae-5388-6eed-12a2f249994c; HMS=92cb560b-c850-42bb-8573-8ef2d5d7ad27; MC1=GUID=3760ddc2b9ae53886eed12a2f249994c; OIP=gdpr|-1; cesc=%7B%22marketingClick%22%3A%5B%22false%22%2C1697307627712%5D%2C%22hitNumber%22%3A%5B%221%22%2C1697307627712%5D%2C%22visitNumber%22%3A%5B%222%22%2C1697307627712%5D%2C%22entryPage%22%3A%5B%22page.Hotels.Infosite.Information%22%2C1697307627712%5D%7D; hav=3760ddc2-b9ae-5388-6eed-12a2f249994c; ha-device-id=3760ddc2-b9ae-5388-6eed-12a2f249994c; has=9fad7744-0a3c-77d4-cca5-a58a551fa52a; hav=3760ddc2-b9ae-5388-6eed-12a2f249994c"
//         // );

//         const result = await fetch("https://www.fewo-direkt.de/graphql", {
//             method: "POST",
//             headers: {
//                 "content-type": "application/json",
//                 "client-info": "blossom-flex-ui,19501edf899ca02c6d68cfefa3beb18624c131e2,us-east-1",
//                 "user-agent":
//                     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
//                 "x-page-id": "page.Hotels.Infosite.Information,H,30",
//             },
//             body: JSON.stringify([
//                 {
//                     operationName: "PropertyFilteredReviewsQuery",
//                     variables: {
//                         context: {
//                             siteId: 9003020,
//                             locale: "de_DE",
//                             eapid: 20,
//                             currency: "EUR",
//                             device: {
//                                 type: "DESKTOP",
//                             },
//                             identity: {
//                                 duaid: "ad0bd7fc-b8b6-b111-0788-0dacba80b313",
//                                 expUserId: "-1",
//                                 tuid: "-1",
//                                 authState: "ANONYMOUS",
//                             },
//                             privacyTrackingState: "CAN_NOT_TRACK",
//                             debugContext: {
//                                 abacusOverrides: [],
//                                 alterMode: "RELEASED",
//                             },
//                         },
//                         propertyId: "55562987",
//                         searchCriteria: {
//                             primary: {
//                                 dateRange: null,
//                                 rooms: [
//                                     {
//                                         adults: 2,
//                                     },
//                                 ],
//                                 destination: {
//                                     regionId: "6050610",
//                                 },
//                             },
//                             secondary: {
//                                 booleans: [
//                                     {
//                                         id: "includeRecentReviews",
//                                         value: true,
//                                     },
//                                     {
//                                         id: "includeRatingsOnlyReviews",
//                                         value: true,
//                                     },
//                                     {
//                                         id: "overrideEmbargoForIndividualReviews",
//                                         value: true,
//                                     },
//                                     {
//                                         id: "isFilteredSummary",
//                                         value: true,
//                                     },
//                                 ],
//                                 counts: [
//                                     {
//                                         id: "startIndex",
//                                         value: 0,
//                                     },
//                                     {
//                                         id: "size",
//                                         value: 100,
//                                     },
//                                 ],
//                                 selections: [
//                                     {
//                                         id: "sortBy",
//                                         value: "NEWEST_TO_OLDEST_BY_LANGUAGE",
//                                     },
//                                     {
//                                         id: "searchTerm",
//                                         value: "",
//                                     },
//                                 ],
//                             },
//                         },
//                     },
//                     extensions: {
//                         persistedQuery: {
//                             version: 1,
//                             sha256Hash: "b6755caee5a1fc2bdb97929eb15a2fcff6c365711a3ed8cb11a75c97ec4338b5",
//                         },
//                     },
//                 },
//             ]),
//         }).then((response) => response.json());

//         console.log(JSON.stringify(result));

//         Cache.store<Review[]>(results, "fewo-direct");
//         resolve(results);
//     });
// }
