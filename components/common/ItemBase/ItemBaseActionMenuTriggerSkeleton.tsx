import { Skeleton } from "@/components/ui";
import { twMerge } from "tailwind-merge";

export function ItemBaseActionMenuTriggerSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={twMerge("flex h-8 w-8 items-center justify-center", className)}
    >
      <Skeleton className="h-1 w-4" />
    </div>
  );
}
