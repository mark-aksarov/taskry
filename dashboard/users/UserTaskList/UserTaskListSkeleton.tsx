import { Repeat } from "@/common/Repeat";
import { UserTaskList } from "./UserTaskList";
import { UserTaskListItemSkeleton } from "../UserTaskListItem";
import { TaskGridItemMobileSkeleton } from "@/dashboard/tasks/TaskGridItem";

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
