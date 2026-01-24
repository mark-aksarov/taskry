import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/components/ui/Skeleton";
import { ProgressBar, ProgressBarProps } from "@/components/ui/ProgressBar";

interface GridItemProgressProps extends Omit<ProgressBarProps, "className"> {
  className?: string;
}

export function GridItemProgress({
  className,
  ...props
}: GridItemProgressProps) {
  return <ProgressBar {...props} className={twMerge("w-full", className)} />;
}

export function GridItemProgressSkeleton() {
  return <Skeleton className="h-1.5 w-full" />;
}
