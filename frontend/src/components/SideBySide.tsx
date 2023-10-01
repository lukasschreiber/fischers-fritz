import React from "react";

export function SideBySide(props: React.PropsWithChildren) {
  return (
    <section className="flex gap-10 p-10 bg-neutral-100 justify-evenly">
      {props.children}
    </section>
  );
}

SideBySide.Section = function SideBySideSection(props: React.PropsWithChildren) {
  return <div>{props.children}</div>;
};
