"use client";

import { useTaskItemPending } from "./TaskItem";
import { TaskListItemInner, TaskListItemProps } from "./TaskListItem";

// AssignedTaskListItem does not have access to SelectedTasksProvider and UpdateTaskStatusesProvider
export const AssignedTaskListItem = (
  props: Omit<TaskListItemProps, "showCheckbox">,
) => {
  const isPending = useTaskItemPending(props.id);

  return (
    <div className={isPending ? "pointer-events-none" : undefined}>
      <TaskListItemInner {...props} isPending={isPending} />
    </div>
  );
};
