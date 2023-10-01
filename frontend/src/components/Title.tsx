export function Title(props: { text: string; style?: "h2" | "h3" }) {
  if (props.style === undefined || props.style === "h2") {
    return (
      <h2 className="relative font-bold text-3xl text-neutral-700 border-b pb-4 w-full after:bg-fritz-teal-500 after:absolute after:left-0 after:bottom-0 after:w-14 after:h-0.5">
        {props.text}
      </h2>
    );
  } else if (props.style === "h3") {
    return (
      <h2 className="font-bold text-2xl  text-neutral-700">{props.text}</h2>
    );
  }
}
