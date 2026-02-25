import { Skeleton } from "@/components/ui/Skeleton";

const styles = "-m-1 flex flex-col gap-2 p-1 items-start";

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
      <Skeleton size="xs" className="w-[7rem]" />
      <Skeleton size="xs" className="w-[9rem]" />
      <Skeleton size="xs" className="w-[6rem]" />
    </div>
  );
}
