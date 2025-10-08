import { Skeleton } from "@/components/ui";
import { twMerge } from "tailwind-merge";

const styles = "h-8 w-8 rounded-full overflow-hidden relative";

interface ListItemImageContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export function ListItemImageContainer({
  className,
  children,
}: ListItemImageContainerProps) {
  return (
    <div className={twMerge(styles, "bg-gray-200 dark:bg-gray-700", className)}>
      {children}
    </div>
  );
}

export function ListItemImageContainerSkeleton({
  className,
}: {
  className?: string;
}) {
  return <Skeleton className={twMerge(styles, className)} />;
}
