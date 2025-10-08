import { Skeleton } from "@/components/ui";
import { twMerge } from "tailwind-merge";

const styles = "h-9 w-9 rounded-full overflow-hidden relative";

interface GridItemImageContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export function GridItemImageContainer({
  className,
  children,
}: GridItemImageContainerProps) {
  return (
    <div className={twMerge(styles, "bg-gray-200 dark:bg-gray-700", className)}>
      {children}
    </div>
  );
}

export function GridItemImageContainerSkeleton({
  className,
}: {
  className?: string;
}) {
  return <Skeleton className={twMerge(styles, className)} />;
}
