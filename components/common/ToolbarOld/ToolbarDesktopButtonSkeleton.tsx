import { Skeleton } from "@/components/ui/Skeleton";
import { twMerge } from "tailwind-merge";

interface ToolbarDesktopButtonSkeletonProps {
  className?: string;
}

export function ToolbarDesktopButtonSkeleton({
  className,
}: ToolbarDesktopButtonSkeletonProps) {
  return <Skeleton className={twMerge("h-8 w-[5rem] rounded-lg", className)} />;
}
