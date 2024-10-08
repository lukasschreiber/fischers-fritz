import { Review } from "../../types";

export function ReviewText(props: { review: Review; maxLength?: number }) {
  const maxLength = props.maxLength || Number.MAX_VALUE;
  let currentPosition = 0;
  const renderedText = [];

  props.review.keywords
    .filter((keyword) => keyword.bounds[1] <= maxLength)
    .forEach((keyword, index) => {
      const beforeHighlightText = props.review.text.slice(
        currentPosition,
        Math.min(maxLength, keyword.bounds[0])
      );
      renderedText.push(
        <span key={`before_${index}`}>{beforeHighlightText}</span>
      );

      const highlightedText = props.review.text.slice(
        keyword.bounds[0],
        Math.min(keyword.bounds[1], maxLength)
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

  const endOfText =
    maxLength > props.review.text.length
      ? maxLength
      : props.review.text.lastIndexOf(" ", maxLength);
  const remainingText = props.review.text.slice(currentPosition, endOfText);
  renderedText.push(
    <span key="remaining">
      {remainingText}
      {endOfText < props.review.text.length ? "..." : ""}
    </span>
  );

  return <div className="text-sm">{renderedText}</div>;
}
