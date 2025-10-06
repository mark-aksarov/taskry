import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/components/ui";

interface ItemCardFieldProps {
  className?: string;
  children: React.ReactNode;
}

const fieldStyles = "flex-1 overflow-hidden flex flex-col gap-1";

export function ItemCardField({ className, children }: ItemCardFieldProps) {
  return <div className={twMerge(fieldStyles, className)}>{children}</div>;
}

export function ItemCardFieldSkeleton({ className }: { className?: string }) {
  return (
    <div className={twMerge(fieldStyles, className)}>
      <Skeleton className="w-[10rem]" size="sm" />
      <Skeleton className="w-[7rem]" size="xs" />
    </div>
  );
}
