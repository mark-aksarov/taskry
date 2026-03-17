import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { TaskListItemSkeleton } from "../TaskListItem";

interface TaskListSkeletonProps {
  className?: string;
  items: number;
  showCheckbox?: boolean;
}

export function TaskListSkeleton({
  className,
  items,
  showCheckbox,
}: TaskListSkeletonProps) {
  return (
    <List className={className}>
      <Repeat
        items={items}
        renderItem={() => <TaskListItemSkeleton showCheckbox={showCheckbox} />}
      />
    </List>
  );
}
