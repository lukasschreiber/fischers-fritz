import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
import {
  GoogleReviewResponseType,
  Review,
  ReviewResponseType,
} from "@fischers-fritz/types";

dotenv.config();
const app = express();
const port = 3000;
app.use(cors());

const reviews: Review[] = [];
const reviewsUpdated = 0;

const reviewsNeedUpdate = () => {
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - reviewsUpdated;
  const millisecondsIn24Hours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  return timeDifference > millisecondsIn24Hours;
};

app.get("/reviews", async (req, res) => {
  try {
    if (reviewsNeedUpdate()) {
      const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.GOOGLE_PLACE_ID}&fields=reviews&key=${process.env.GOOGLE_API_KEY}&language=de`;
      const response = await fetch(apiUrl);
      const data = (await response.json()) as GoogleReviewResponseType;
      res.json({
        result: data.result.reviews.map((review) => ({
          author_name: review.author_name,
          author_url: review.author_url,
          rating: review.rating,
          text: review.text,
          relative_time_description: review.relative_time_description,
        })),
      } as ReviewResponseType);
    } else {
      res.json({ result: reviews } as ReviewResponseType);
    }
  } catch (error) {
    res.status(500).json({ error: "Proxy error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
