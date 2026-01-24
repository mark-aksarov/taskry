import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/components/ui/Skeleton";

export function ItemBaseButtonSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      className={twMerge(
        "h-[1.75rem] w-[3.75rem] justify-center rounded-full",
        className,
      )}
    />
  );
}
