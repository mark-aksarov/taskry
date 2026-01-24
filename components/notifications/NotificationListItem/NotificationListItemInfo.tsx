import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/components/ui/Skeleton";

interface NotificationListItemInfoProps {
  className?: string;
  children: React.ReactNode;
}

const styles = "flex flex-col gap-1";

export function NotificationListItemInfo({
  className,
  children,
}: NotificationListItemInfoProps) {
  return <div className={twMerge(styles, className)}>{children}</div>;
}

export function NotificationListItemInfoSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={twMerge(styles, className)}>
      <Skeleton className="w-[12rem]" size="sm" />
      <Skeleton className="w-[7rem]" size="xs" />
    </div>
  );
}
