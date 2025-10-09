import { Skeleton } from "@/components/ui";

const styles = "-m-1 flex flex-col gap-2 overflow-hidden p-1";

export function GridItemContactList({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles}>{children}</div>;
}

export function GridItemContactListSkeleton() {
  return (
    <div className={styles}>
      <Skeleton size="xs" />
      <Skeleton size="xs" />
      <Skeleton size="xs" />
    </div>
  );
}
