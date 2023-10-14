import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Review, ReviewResponseType, SortOption } from "@fischers-fritz/types";
import { getFeWoDirectReviews, getFeWoReviews, getGoogleReviews } from "./reviews";
import * as Cache from "./utils/cache";
import cron from "node-cron";

dotenv.config();
const app = express();
const port = 3000;
app.use(cors());
Cache.init();

app.get("/reviews", async (req, res) => {
  const sort: SortOption =
    (req.query.sort as SortOption) ?? "rating_and_length_desc";
  const sortingFunctions: Record<SortOption, (a: Review, b: Review) => number> =
    {
      rating_and_length_desc: (a, b) =>
        b.rating - a.rating === 0
          ? b.text.length - a.text.length
          : b.rating - a.rating,
      date_desc: (a, b) => b.time - a.time,
    };
  const reviews = [...(await getFeWoReviews()), ...(await getGoogleReviews()), ...(await getFeWoDirectReviews())];

  res.json({
    result: reviews.sort(sortingFunctions[sort]),
  } as ReviewResponseType);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

cron.schedule("0 1 * * *", async () => {
  Cache.clear();
  await getFeWoReviews();
  await getGoogleReviews();
  await getFeWoDirectReviews();
});
