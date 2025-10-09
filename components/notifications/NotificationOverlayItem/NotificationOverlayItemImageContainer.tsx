import { Skeleton } from "@/components/ui";
import { twMerge } from "tailwind-merge";

const styles = "shrink-0 h-10 w-10 rounded-full overflow-hidden relative";

interface NotificationOverlayItemImageContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export function NotificationOverlayItemImageContainer({
  className,
  children,
}: NotificationOverlayItemImageContainerProps) {
  return (
    <div className={twMerge(styles, "bg-gray-200 dark:bg-gray-700", className)}>
      {children}
    </div>
  );
}

export function NotificationOverlayItemImageContainerSkeleton({
  className,
}: {
  className?: string;
}) {
  return <Skeleton className={twMerge(styles, className)} />;
}
