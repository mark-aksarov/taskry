import { Skeleton } from "@/components/ui/Skeleton";

const styles = "flex flex-col items-center gap-1.5";

export function DetailHeaderInfo({ children }: { children: React.ReactNode }) {
  return <div className={styles}>{children}</div>;
}

export function DetailHeaderInfoSkeleton() {
  return (
    <div className={styles}>
      <Skeleton className="w-[7rem]" size="lg" />
      <Skeleton className="w-[10rem]" size="sm" />
    </div>
  );
}
