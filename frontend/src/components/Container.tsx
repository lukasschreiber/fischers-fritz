import React from "react";

export function Container(props: React.ComponentPropsWithoutRef<"div">) {
  const {className, ...rest} = props;
  return (
    <section className={`relative flex items-center p-10 bg-neutral-100 justify-evenly ${className}`} {...rest}>
      <div className="relative max-w-full md:max-w-6xl flex flex-col md:flex-row gap-10 w-full">{props.children}</div>
    </section>
  );
}

Container.Section = function ContainerSection(props: React.ComponentPropsWithoutRef<"div">) {
  return <div className={`relative flex-grow ${props.className}`}>{props.children}</div>;
};
