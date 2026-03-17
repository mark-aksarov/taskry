import { twMerge } from "tailwind-merge";

interface ToolbarLargeProps {
  firstSlot?: React.ReactNode;
  secondSlot?: React.ReactNode;
  twoRowsOnLg?: boolean;
}

export function ToolbarLarge({
  firstSlot,
  secondSlot,
  twoRowsOnLg,
}: ToolbarLargeProps) {
  return (
    <div
      className={twMerge(
        "flex items-center justify-between gap-4 max-md:hidden",
        twoRowsOnLg && "max-lg:flex-col max-lg:items-start",
      )}
    >
      <div className="flex items-center gap-4">{firstSlot}</div>
      <div className="flex items-center gap-4">{secondSlot}</div>
    </div>
  );
}
