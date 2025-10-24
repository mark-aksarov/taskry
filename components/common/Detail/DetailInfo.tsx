import { Skeleton } from "@/components/ui";
import { twMerge } from "tailwind-merge";

const styles =
  "flex flex-1 flex-col gap-1.5 border-b-1 border-gray-300 pb-4 dark:border-gray-600";

interface DetailInfoProps {
  className?: string;
  children: React.ReactNode;
}

export function DetailInfo({ className, children }: DetailInfoProps) {
  return <div className={twMerge(styles, className)}>{children}</div>;
}

export function DetailInfoSkeleton({ className }: { className?: string }) {
  return (
    <div className={twMerge(styles, className)}>
      <Skeleton className="w-[7rem]" size="xs" />
      <Skeleton className="w-[10rem]" size="sm" />
    </div>
  );
}
