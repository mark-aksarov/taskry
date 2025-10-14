import { Skeleton } from "@/components/ui";
import { twMerge } from "tailwind-merge";

const styles = "h-15 w-15 rounded-full overflow-hidden relative shrink-0";

interface EntitySummaryImageContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export function EntitySummaryImageContainer({
  className,
  children,
}: EntitySummaryImageContainerProps) {
  return (
    <div className={twMerge(styles, "bg-gray-200 dark:bg-gray-700", className)}>
      {children}
    </div>
  );
}

export function EntitySummaryImageContainerSkeleton({
  className,
}: {
  className?: string;
}) {
  return <Skeleton className={twMerge(styles, className)} />;
}
