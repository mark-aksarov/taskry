import { Fragment } from "react";

interface ListSkeletonProps {
  items?: number;
  renderItem: () => React.ReactNode;
}

export function ListSkeleton({ items = 10, renderItem }: ListSkeletonProps) {
  return (
    <div>
      {Array.from({ length: items }, (_, index) => index).map((_, index) => (
        <Fragment key={index}>{renderItem()}</Fragment>
      ))}
    </div>
  );
}
