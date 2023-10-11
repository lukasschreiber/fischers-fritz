import { Review } from "@fischers-fritz/types";
import { ApartmentsGreetsielLogo, GoogleLogo, Star } from "../../assets";

export function ReviewHeader(props: { review: Review }) {
    return (
      <div className="flex flex-row justify-between gap-2">
        {props.review.profileImage && (
          <img src={props.review.profileImage} className="h-10 w-10" />
        )}
        <div className="flex flex-col">
          <div className="text-neutral-700">{props.review.authorName}</div>
          <div className="text-xs text-neutral-400 flex flex-row gap-1 items-center">
            <div>
              {new Date(props.review.time * 1000).toLocaleDateString("de-DE", {
                month: "long",
                year: "numeric",
                day: "2-digit",
              })}{" "}
              über
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
    );
  }