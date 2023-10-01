import { useEffect, useState } from "react";
import { Review, ReviewResponseType } from "@fischers-fritz/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/reviews", {
      method: "GET",
    })
      .then((body) => body.json() as Promise<ReviewResponseType>)
      .then((json) =>
        setReviews([...json.result, ...json.result, json.result[0]])
      )
      .catch(console.log);
  }, []);
  return (
    <div className="w-full h-fit">
      <Swiper
        modules={[Pagination]}
        slidesPerView={3}
        spaceBetween={30}
        pagination={{ clickable: true }}
        className="h-fit!"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.author_name} className="h-fit">
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function ReviewCard(props: { review: Review }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-5 w-[300px] flex m-10">
      {props.review.author_name}<br />
      {props.review.text}
    </div>
  );
}
