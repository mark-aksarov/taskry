import { Skeleton } from "@/components/ui";

const styles =
  "flex flex-1 flex-col gap-1 border-b-1 border-gray-300 pb-4 dark:border-gray-600";

export function EntityDetailsInfo({ children }: { children: React.ReactNode }) {
  return <div className={styles}>{children}</div>;
}

export function EntityDetailsInfoSkeleton() {
  return (
    <div className={styles}>
      <Skeleton className="w-[7rem]" size="xs" />
      <Skeleton className="w-[10rem]" size="sm" />
    </div>
  );
}
