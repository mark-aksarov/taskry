import { ProgressBar, ProgressBarProps, Skeleton } from "@/components/ui";
import { twMerge } from "tailwind-merge";

const progressStyles = "w-[10rem] @max-md:hidden";

interface ItemCardProgressProps extends Omit<ProgressBarProps, "className"> {
  className?: string;
}

export function ItemCardProgress({
  className,
  ...props
}: ItemCardProgressProps) {
  return (
    <ProgressBar {...props} className={twMerge(progressStyles, className)} />
  );
}

export function ItemCardProgressSkeleton() {
  return <Skeleton size="xs" className={progressStyles} />;
}
