import { Review } from "@fischers-fritz/types";
import { ReviewHeader } from "./ReviewHeader";
import { ReviewText } from "./ReviewText";

export function ReviewCard(props: { review: Review }) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-5 w-[300px] flex m-10 flex-col gap-2">
        <ReviewHeader review={props.review} />
        <h3 className="font-bold text-neutral-700 w-full">
          {props.review.title}
        </h3>
        <ReviewText review={props.review} maxLength={500} />
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