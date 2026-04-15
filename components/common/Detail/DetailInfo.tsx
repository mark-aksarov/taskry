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
  content: React.ReactNode;
  editButton?: React.ReactNode;
  "data-test"?: string;
}

export function DetailInfoAlt({
  className,
  title,
  content,
  editButton,
  "data-test": dataTest,
}: DetailInfoAltProps) {
  return (
    <div data-test={dataTest} className={twMerge(styles, className)}>
      <div className="flex items-center justify-between self-stretch">
        {title}
        {editButton}
      </div>
      {content}
    </div>
  );
}
