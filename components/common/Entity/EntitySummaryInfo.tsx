import { Skeleton } from "@/components/ui";
import { twMerge } from "tailwind-merge";

const styles = "flex flex-col gap-3";

export function EntitySummaryInfo({ children }: { children: React.ReactNode }) {
  return <div className={styles}>{children}</div>;
}

export function EntitySummaryInfoSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={twMerge(styles, className)}>
      <Skeleton className="w-[8rem]" size="xl" />
      <div className="flex w-full flex-col">
        <Skeleton size="sm" />
        <Skeleton className="w-9/10" size="sm" />
      </div>
    </div>
  );
}
