import { Skeleton } from "@/components/ui/Skeleton";
import { twMerge } from "tailwind-merge";

interface ToolbarMobileBottomButtonSkeletonProps {
  className?: string;
}

export function ToolbarMobileBottomButtonSkeleton({
  className,
}: ToolbarMobileBottomButtonSkeletonProps) {
  return <Skeleton className={twMerge("h-8 w-[5rem] rounded-lg", className)} />;
}
