import { useEffect, useState } from "react";
import { Review, ReviewResponseType } from "@fischers-fritz/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/reviews", {
      method: "GET",
    })
      .then((body) => body.json() as Promise<ReviewResponseType>)
      .then((json) => setReviews([...json.result]))
      .catch(console.log);
  }, []);

  return (
    <div className="reviews">
      <a href={import.meta.env.VITE_GOOGLE_REVIEW_LINK} target="_blank">
        Jetzt bewerten
      </a>
      {reviews.length} Reviews, Mean:{" "}
      {reviews.reduce((p, c) => p + c.rating, 0) / reviews.length}
      <div>
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating}>
            {rating}:{" "}
            {reviews.filter((review) => review.rating === rating).length}{" "}
            Reviews
          </div>
        ))}
      </div>
      <div className="w-full h-fit">
        <Swiper
          modules={[Pagination]}
          slidesPerView={3}
          spaceBetween={30}
          pagination={{ clickable: true }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

function ReviewCard(props: { review: Review }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-5 w-[300px] flex m-10 flex-col gap-2">
      {props.review.profileImage && (
        <img src={props.review.profileImage} className="h-16 w-16" />
      )}
      {props.review.authorName}
      <br />
      {props.review.rating}
      <br />
      {new Date(props.review.time * 1000).toLocaleDateString("de-DE", {
        month: "long",
        year: "numeric",
        day: "2-digit",
      })}{" "}
      on {props.review.source}
      <br />
      <b>{props.review.title}</b>
      <br />
      {props.review.text.slice(0, 400)}
      {props.review.text.length > 400 ? " [more]" : ""}
      {props.review.details?.map((detail) => {
        return (
          <div key={detail.label}>
            {detail.label}: <i>{detail.rating}</i>
          </div>
        );
      })}
    </div>
  );
}
