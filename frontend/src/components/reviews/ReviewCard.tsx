import { Review } from "../../types";
import { ReviewHeader } from "./ReviewHeader";
import { ReviewText } from "./ReviewText";

export function ReviewCard(props: React.ComponentPropsWithoutRef<"div"> & { review: Review, maxLength?: number, starStyle: "small" | "normal" }) {
    return (
      <div className={`bg-white shadow-lg rounded-lg p-5 w-[300px] flex flex-col gap-2 ${props.className}`}>
        <ReviewHeader review={props.review} starStyle={props.starStyle} />
        <h3 className="font-bold text-neutral-700 w-full">
          {props.review.title}
        </h3>
        <ReviewText review={props.review} maxLength={props.maxLength} />
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