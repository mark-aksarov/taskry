import { PageListSkeleton } from "@/components/common/PageListSkeleton";
import { TaskListItemSkeleton } from "@/components/tasks/TaskListItem";

export default function TasksPageLoading() {
  return (
    <PageListSkeleton
      title="All Tasks"
      renderItemSkeleton={() => <TaskListItemSkeleton />}
    />
  );
}
