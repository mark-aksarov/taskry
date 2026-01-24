import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/components/ui/Skeleton";

interface GridItemInfoProps {
  className?: string;
  children: React.ReactNode;
}

const styles = "overflow-hidden flex flex-col gap-1 -m-1 p-1";

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
