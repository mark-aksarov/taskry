import { Skeleton } from "@/components/ui";
import { twMerge } from "tailwind-merge";

const styles = "rounded-full overflow-hidden relative flex-none";

interface ImageContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export function ImageContainer({ className, children }: ImageContainerProps) {
  return (
    <div className={twMerge(styles, "bg-gray-200 dark:bg-gray-700", className)}>
      {children}
    </div>
  );
}

export function ImageContainerSkeleton({ className }: { className?: string }) {
  return <Skeleton className={twMerge(styles, className)} />;
}
