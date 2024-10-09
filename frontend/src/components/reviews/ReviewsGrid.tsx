import { Review } from "../../types";
import "swiper/css";
import "swiper/css/pagination";
import { ReviewCard } from "./ReviewCard";
import { useState } from "react";

export function ReviewGrid(props: { reviews: Review[] }) {
  const [screenSize, setScreenSize] = useState(document.body.clientWidth);

  window.addEventListener("resize", () => {
    setScreenSize(document.body.clientWidth);
  });

  const breakpoints: Record<number, { columnCount: number }> = {
    640: {
      columnCount: 1,
    },
    768: {
      columnCount: 2,
    },
    1200: {
      columnCount: 3,
    },
  };

  const columnCount = (): number => {
    const availableBreakpoints = Object.keys(breakpoints).map((x) =>
      parseInt(x)
    );
    let key = availableBreakpoints.find(
      (value, i) =>
        value <= screenSize &&
        (i >= availableBreakpoints.length - 1 ||
          availableBreakpoints[i + 1] >= screenSize)
    );
    if (key === undefined) key = Math.min(...availableBreakpoints);
    return breakpoints[key].columnCount;
  };

  return (
    <>
      <div
        className="grid gap-6 mt-5"
        style={{
          gridTemplateColumns: `repeat(${columnCount()}, minmax(0, 1fr))`,
        }}
      >
        {Array.from(new Array(columnCount())).map((_, column) => {
          return (
            <div className="flex flex-col gap-6" key={column}>
              {props.reviews
                .filter((_, index) => index % columnCount() === column)
                .map((review, index) => (
                  <ReviewCard
                    review={review}
                    key={column + "_" + index}
                    className="w-full"
                    starStyle="normal"
                  />
                ))}
            </div>
          );
        })}
      </div>
    </>
  );
}
