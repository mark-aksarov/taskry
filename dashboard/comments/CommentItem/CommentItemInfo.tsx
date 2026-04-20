import { Skeleton } from "@/ui/Skeleton";

const styles = "flex flex-col gap-1";

export function CommentItemInfo({ children }: { children: React.ReactNode }) {
  return <div className={styles}>{children}</div>;
}

export function CommentItemInfoSkeleton() {
  return (
    <div className={styles}>
      <Skeleton className="w-[10rem]" size="sm" />
      <Skeleton className="w-[7rem]" size="xs" />
    </div>
  );
}
