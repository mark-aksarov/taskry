import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/components/ui";

interface ListItemInfoProps {
  className?: string;
  children: React.ReactNode;
}

const styles =
  "flex-1 items-start overflow-hidden flex flex-col gap-1 -m-1 p-1";

export function ListItemInfo({ className, children }: ListItemInfoProps) {
  return <div className={twMerge(styles, className)}>{children}</div>;
}

export function ListItemInfoSkeleton({ className }: { className?: string }) {
  return (
    <div className={twMerge(styles, className)}>
      <Skeleton className="w-[10rem] max-w-full" size="sm" />
      <Skeleton className="w-[7rem] max-w-full" size="xs" />
    </div>
  );
}
