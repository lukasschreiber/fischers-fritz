import { Star } from "../../assets";

export function Stars(props: { max: number; mean: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(props.max).keys()].map((i) => {
        const starFillPercentage =
          props.mean <= i
            ? 0
            : i < props.mean && props.mean <= i + 1
            ? (props.mean - i) * 100
            : 100;

        console.log(i, props.mean, starFillPercentage);
        return (
          <div key={i} className="relative">
            <Star
              className={`w-4 h-4 text-yellow-400 ${
                starFillPercentage == 0 ? "hidden" : ""
              }`}
              style={{
                clipPath: `polygon(0 0, ${starFillPercentage}% 0, ${starFillPercentage}% 100%, 0% 100%)`,
              }}
            />
            <Star
              className={`w-4 h-4 text-neutral-400 ${starFillPercentage == 100 ? "hidden" : ""} ${starFillPercentage > 0 ? "top-0 absolute" : ""}`}
              style={{
                clipPath: `polygon(${starFillPercentage}% 0, 100% 0, 100% 100%, ${starFillPercentage}% 100%)`,
              }}
            />
          </div>
        );
      })}
      <div>{props.mean}</div>
    </div>
  );
}
