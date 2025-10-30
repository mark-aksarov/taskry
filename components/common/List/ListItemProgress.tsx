import { ProgressBar, ProgressBarProps, Skeleton } from "@/components/ui";
import { twMerge } from "tailwind-merge";

const progressStyles = "w-[8rem] @max-md:hidden";

interface ListItemProgressProps extends Omit<ProgressBarProps, "className"> {
  className?: string;
}

export function ListItemProgress({
  className,
  ...props
}: ListItemProgressProps) {
  return (
    <ProgressBar {...props} className={twMerge(progressStyles, className)} />
  );
}

export function ListItemProgressSkeleton() {
  return <Skeleton size="xs" className={progressStyles} />;
}
