import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/components/ui/Skeleton";

const styles = "flex items-start flex-1 flex-col gap-3";

interface DetailInfoAltProps {
  className?: string;
  title: React.ReactNode;
  content: React.ReactNode;
  surface?: boolean;
  rightSlot?: React.ReactNode;
  "data-test"?: string;
}

export function DetailInfoAlt({
  className,
  title,
  content,
  surface,
  rightSlot,
  "data-test": dataTest,
}: DetailInfoAltProps) {
  return (
    <div data-test={dataTest} className={twMerge(styles, className)}>
      <div className="flex items-center justify-between self-stretch">
        {title}
        {rightSlot}
      </div>
      {surface ? (
        <DetailInfoAltSurface>{content}</DetailInfoAltSurface>
      ) : (
        content
      )}
    </div>
  );
}

function DetailInfoAltSurface({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full rounded-md bg-gray-50 p-3 dark:bg-gray-700/30">
      {children}
    </div>
  );
}

export function DetailInfoAltSkeleton({ surface }: { surface?: boolean }) {
  return (
    <div className={styles}>
      <Skeleton className="w-[7rem]" size="sm" />
      {surface ? (
        <DetailInfoAltSurface>
          <Skeleton className="w-[10rem]" size="sm" />
        </DetailInfoAltSurface>
      ) : (
        <Skeleton className="w-[10rem]" size="sm" />
      )}
    </div>
  );
}
