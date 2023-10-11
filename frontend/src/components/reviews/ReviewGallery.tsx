import { Swiper, SwiperSlide } from "swiper/react";
import { ReviewCard } from "./ReviewCard";
import { Pagination } from "swiper/modules";
import { Review } from "@fischers-fritz/types";
import "swiper/css";
import "swiper/css/pagination";

export function ReviewGallery(props: { reviews: Review[] }) {
  return (
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
            centeredSlides: false,
          },
        }}
      >
        {props.reviews.map((review, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <ReviewCard review={review} className="m-10" maxLength={500} starStyle="small" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
