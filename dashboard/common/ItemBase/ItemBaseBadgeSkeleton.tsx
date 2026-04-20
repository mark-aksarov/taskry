import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/ui/Skeleton";

export function ItemBaseBadgeSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      className={twMerge("h-[1.75rem] w-[5.625rem] rounded-full", className)}
    />
  );
}
