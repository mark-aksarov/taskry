import { UserTaskList } from "./UserTaskList";
import { Repeat } from "@/components/common/Repeat";
import { UserTaskListItemSkeleton } from "../UserTaskListItem";
import { TaskGridItemMobileSkeleton } from "@/components/tasks/TaskGridItem";

interface UserTaskListSkeletonProps {
  items: number;
}

export function UserTaskListSkeleton({ items }: UserTaskListSkeletonProps) {
  return (
    <UserTaskList>
      <Repeat
        items={items}
        renderItem={() => (
          <div>
            <UserTaskListItemSkeleton />
            <TaskGridItemMobileSkeleton />
          </div>
        )}
      />
    </UserTaskList>
  );
}
