import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/components/ui/Skeleton";

const styles =
  "flex items-start flex-1 flex-col gap-3 border-b-1 border-gray-300 pb-4 dark:border-gray-600";

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
      <Skeleton className="w-[7rem]" size="sm" />
      <Skeleton className="w-[10rem]" size="sm" />
    </div>
  );
}

interface DetailInfoAltProps {
  className?: string;
  title: React.ReactNode;
  text: React.ReactNode;
  editButton?: React.ReactNode;
}

export function DetailInfoAlt({
  className,
  title,
  text,
  editButton,
}: DetailInfoAltProps) {
  return (
    <div className={twMerge(styles, className)}>
      <div className="flex items-center justify-between self-stretch">
        {title}
        {editButton}
      </div>
      {text}
    </div>
  );
}
