import { Skeleton } from "@/components/ui/Skeleton";

export interface SubtaskListProps {
  children: React.ReactNode;
}

const styles = "flex flex-col gap-3 w-full";

export function SubtaskList({ children }: SubtaskListProps) {
  return (
    <div data-test="subtask-list" className={styles}>
      {children}
    </div>
  );
}

export function SubtaskListSkeleton() {
  return (
    <div className={styles}>
      <Skeleton size="sm" className="w-[12rem]" />
      <Skeleton size="sm" className="w-[15rem]" />
      <Skeleton size="sm" className="w-[13rem]" />
    </div>
  );
}
