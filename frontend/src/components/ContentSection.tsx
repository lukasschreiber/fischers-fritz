import React from "react";

export function ContentSection(props: React.PropsWithChildren) {
  return (
    <section className="flex gap-10 p-10 bg-neutral-100 justify-evenly">
      {props.children}
    </section>
  );
}

ContentSection.Left = function ContentSectionLeft(props: React.PropsWithChildren) {
  return <div>{props.children}</div>;
};

ContentSection.Right = function ContentSectionRight(props: React.PropsWithChildren) {
  return <div>{props.children}</div>;
};
