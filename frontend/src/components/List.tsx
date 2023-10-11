import { Check } from "../assets";

export function List(props: React.PropsWithChildren) {
  return <div className="relative text-sm text-neutral-500 flex flex-wrap flex-col mt-4">{props.children}</div>;
}

List.Item = function ListItem(props: React.PropsWithChildren) {
    return <div className="flex items-start gap-2"><div className="h-full pt-1"><Check  className="h-3 w-3"/></div><div>{props.children}</div></div>
}