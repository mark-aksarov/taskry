import { Fragment } from "react";

interface RepeatProps {
  items?: number;
  renderItem: () => React.ReactNode;
}

export function Repeat({ items = 10, renderItem }: RepeatProps) {
  return (
    <>
      {Array.from({ length: items }, (_, index) => index).map((_, index) => (
        <Fragment key={index}>{renderItem()}</Fragment>
      ))}
    </>
  );
}
