import { twMerge } from "tailwind-merge";

interface ListItemInfoProps {
  className?: string;
  children: React.ReactNode;
}

// p-1 -m-1: prevents visual clipping of the focus ring when using overflow-hidden
// overflow-hidden + flex-1: each item takes an equal share of the space
// flex: 1 1 0 — grows/shrinks, base size 0
const styles =
  "flex-1 items-start overflow-hidden flex flex-col gap-1 -m-1 p-1";

export function ListItemInfo({ className, children }: ListItemInfoProps) {
  return <div className={twMerge(styles, className)}>{children}</div>;
}
