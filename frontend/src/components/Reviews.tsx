import { useEffect, useState } from "react";
import { Review, ReviewResponseType, SortOption } from "@fischers-fritz/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Star from "./../assets/star.svg?react";
import ApartmentsGreetsielLogo from "./../assets/appartments-greetsiel.svg?react";
import GoogleLogo from "./../assets/google.svg?react";
import "swiper/css";
import "swiper/css/pagination";

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
      <select onChange={(e) => setSort(e.target.value as SortOption)}>
        <option value="rating_and_length_desc">Beste zuerst</option>
        <option value="date_desc">Neuste zuerst</option>
      </select>
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
  let currentPosition = 0;
  const renderedText = [];

  props.review.keywords.forEach((keyword, index) => {
    const beforeHighlightText = props.review.text.slice(
      currentPosition,
      keyword.bounds[0]
    );
    renderedText.push(
      <span key={`before_${index}`}>{beforeHighlightText}</span>
    );

    const highlightedText = props.review.text.slice(
      keyword.bounds[0],
      keyword.bounds[1]
    );
    renderedText.push(
      <b
        className="font-semibold text-neutral-700 bg-gradient-to-t from-fritz-teal-100 to-transparent from-40% to-40%"
        key={`highlighted_${index}`}
      >
        {highlightedText}
      </b>
    );

    currentPosition = keyword.bounds[1];
  });

  // Add the remaining text after the last highlight
  const remainingText = props.review.text.slice(currentPosition);
  renderedText.push(<span key="remaining">{remainingText}</span>);

  return (
    <div className="bg-white shadow-lg rounded-lg p-5 w-[300px] flex m-10 flex-col gap-2">
      <div className="flex flex-row justify-between gap-2">
        {props.review.profileImage && (
          <img src={props.review.profileImage} className="h-10 w-10" />
        )}
        <div className="flex flex-col">
          <div>{props.review.authorName}</div>
          <div className="text-xs text-neutral-400 flex flex-row gap-1 items-center">
            <div>
              {new Date(props.review.time * 1000).toLocaleDateString("de-DE", {
                month: "long",
                year: "numeric",
                day: "2-digit",
              })}{" "}
              on
            </div>
            {props.review.source === "greetsiel-apartments" ? (
              <ApartmentsGreetsielLogo className="h-6 w-6" />
            ) : (
              <GoogleLogo className="h-4 w-4" />
            )}
          </div>
        </div>
        <div className="bg-yellow-300 text-yellow-700 font-bold p-1 rounded-md flex items-center gap-1 h-fit ml-auto">
          <Star className="h-4 w-4" />
          {props.review.rating}
        </div>
      </div>
      <h3 className="font-bold text-neutral-700 w-full">
        {
          props.review
            .title /*?? [...props.review.keywords].sort((a, b) => a.n - b.n)[0].text*/
        }
      </h3>
      <p className="text-sm">{renderedText}</p>
      {/* {props.review.details?.map((detail) => {
        return (
          <div key={detail.label}>
            {detail.label}: <i>{detail.rating}</i>
          </div>
        );
      })} */}
    </div>
  );
}
