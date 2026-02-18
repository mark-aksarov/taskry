import { Skeleton } from "@/components/ui/Skeleton";
import { twMerge } from "tailwind-merge";

interface ToolbarMobileTopButtonSkeletonProps {
  className?: string;
}

export function ToolbarMobileTopButtonSkeleton({
  className,
}: ToolbarMobileTopButtonSkeletonProps) {
  return <Skeleton className={twMerge("h-8 w-8 rounded-lg", className)} />;
}
