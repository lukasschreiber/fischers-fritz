import { PropsWithChildren } from "react";
import { Title } from "./Title";
import { Image } from "./gallery/Image";

export function Grid(props: PropsWithChildren) {
  return <div className="grid md:grid-cols-3 min-[500px]:grid-cols-2 grid-cols-1 mt-8 gap-5">{props.children}</div>;
}

Grid.Item = function GridItem(
  props: PropsWithChildren & { title: string; imageSrc: string }
) {
  return (
    <div className="flex flex-col gap-5">
        <Image title={props.title} src={props.imageSrc} className="max-h-[220px] object-cover object-bottom" />
        <Title text={props.title} style="h3" />
      <div className="text-sm text-neutral-500">{props.children} </div>
    </div>
  );
};
