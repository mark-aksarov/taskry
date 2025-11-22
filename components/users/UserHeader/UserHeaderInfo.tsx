import { Skeleton } from "@/components/ui";
const styles = "flex flex-col items-center gap-1.5";

export function UserHeaderInfo({ children }: { children: React.ReactNode }) {
  return <div className={styles}>{children}</div>;
}

export function UserHeaderInfoSkeleton() {
  return (
    <div className={styles}>
      <Skeleton className="w-[7rem]" size="lg" />
      <Skeleton className="w-[10rem]" size="sm" />
    </div>
  );
}
