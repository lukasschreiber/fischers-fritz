import { useEffect, useState } from "react";
import { Review, ReviewResponseType, SortOption } from "@fischers-fritz/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Stars } from "./Stars";
import { ReviewCard } from "./ReviewCard";

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sort, setSort] = useState<SortOption>("rating_and_length_desc");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/reviews?sort=${sort}`, {
      method: "GET",
    })
      .then((body) => body.json() as Promise<ReviewResponseType>)
      .then((json) => setReviews([...json.result]))
      .catch(console.log);
  }, [sort]);

  const mean = (reviews: Review[]) => {
    return reviews.reduce((p, c) => p + c.rating, 0) / reviews.length;
  };

  return (
    <div className="reviews">
      <div className="text-sm flex gap-2 px-10 pt-2">
        <div>
          <Stars max={5} mean={mean(reviews)} />
          <div className="text-neutral-400">{reviews.length} Bewertungen</div>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <div className="text-neutral-400">Sortierung:</div>
          <select className="outline-0" onChange={(e) => setSort(e.target.value as SortOption)}>
            <option value="rating_and_length_desc">Beste zuerst</option>
            <option value="date_desc">Neuste zuerst</option>
          </select>
        </div>
      </div>

      {/* <div>
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating}>
            {rating}:{" "}
            {reviews.filter((review) => review.rating === rating).length}{" "}
            Reviews
          </div>
        ))}
      </div> */}
      <div className="w-full h-fit">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          centeredSlides={true}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 30,
              centeredSlides: false
            },
          }}
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

