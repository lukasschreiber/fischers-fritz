import React from "react";

export function Container(props: React.PropsWithChildren & {className?: string}) {
  return (
    <section className={`flex items-center p-10 bg-neutral-100 justify-evenly ${props.className}`}>
      <div className="max-w-full md:max-w-6xl flex flex-col md:flex-row gap-10 ">{props.children}</div>
    </section>
  );
}

Container.Section = function ContainerSection(props: React.PropsWithChildren) {
  return <div className="flex-grow">{props.children}</div>;
};
