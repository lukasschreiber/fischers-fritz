import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  ReviewResponseType,
} from "@fischers-fritz/types";
import { getFeWoReviews, getGoogleReviews } from "./reviews";
import * as Cache from "./utils/cache"

dotenv.config();
const app = express();
const port = 3000;
app.use(cors());
Cache.init();

app.get("/reviews", async (req, res) => {
    const reviews = [
      ...await getFeWoReviews(),
      ...await getGoogleReviews()
    ];

    res.json({ result: reviews } as ReviewResponseType);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
