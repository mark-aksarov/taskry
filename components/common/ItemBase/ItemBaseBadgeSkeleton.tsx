import { Skeleton } from "@/components/ui";
import { twMerge } from "tailwind-merge";

export function ItemBaseBadgeSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      className={twMerge("h-[1.75rem] w-[5.625rem] rounded-full", className)}
    />
  );
}
