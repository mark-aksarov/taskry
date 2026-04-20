import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/ui/Skeleton";

interface GridItemInfoProps {
  className?: string;
  children: React.ReactNode;
}

// p-1 -m-1: prevents visual clipping of the focus ring when using overflow-hidden
const styles = "overflow-hidden flex flex-col items-start gap-1 -m-1 p-1";

export function GridItemInfo({ className, children }: GridItemInfoProps) {
  return <div className={twMerge(styles, className)}>{children}</div>;
}

export function GridItemInfoSkeleton({ className }: { className?: string }) {
  return (
    <div className={twMerge(styles, className)}>
      <Skeleton className="w-[7rem] max-w-full" size="sm" />
      <Skeleton className="w-[5rem] max-w-full" size="xs" />
    </div>
  );
}
