import { Repeat } from "@/components/common/Repeat";
import { GridMobile } from "@/components/common/Grid";
import { TaskGridItemMobileSkeleton } from "../TaskGridItem";

interface TaskGridMobileSkeletonProps {
  className?: string;
  items: number;
}

export function TaskGridMobileSkeleton({
  className,
  items,
}: TaskGridMobileSkeletonProps) {
  return (
    <GridMobile className={className}>
      <Repeat items={items} renderItem={() => <TaskGridItemMobileSkeleton />} />
    </GridMobile>
  );
}
