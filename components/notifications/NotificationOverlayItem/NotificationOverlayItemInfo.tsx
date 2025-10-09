import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/components/ui";

interface NotificationOverlayItemInfoProps {
  className?: string;
  children: React.ReactNode;
}

const styles = "flex flex-col gap-1";

export function NotificationOverlayItemInfo({
  className,
  children,
}: NotificationOverlayItemInfoProps) {
  return <div className={twMerge(styles, className)}>{children}</div>;
}

export function NotificationOverlayItemInfoSkeleton({
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
