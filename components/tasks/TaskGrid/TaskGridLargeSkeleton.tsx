import { Repeat } from "@/components/common/Repeat";
import { GridLarge } from "@/components/common/Grid";
import { TaskGridItemLargeSkeleton } from "../TaskGridItem";

interface TaskGridLargeSkeletonProps {
  className?: string;
  items: number;
}

export function TaskGridLargeSkeleton({
  className,
  items,
}: TaskGridLargeSkeletonProps) {
  return (
    <GridLarge className={className}>
      <Repeat items={items} renderItem={() => <TaskGridItemLargeSkeleton />} />
    </GridLarge>
  );
}
