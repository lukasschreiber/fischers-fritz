import { getFeWoDirectReviews, getFeWoReviews, getGoogleReviews } from "./reviews.js";

(async () => {
    console.log("updating...")
    await getFeWoReviews();
    console.log("updated fewo reviews")
    await getGoogleReviews();
    console.log("updated google reviews")
    await getFeWoDirectReviews();
    console.log("updated fewo direct reviews")
})()