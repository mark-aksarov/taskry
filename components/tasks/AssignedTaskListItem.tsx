"use client";

import { TaskItemPendingOverlay } from "./TaskItem";
import { TaskListItemInner, TaskListItemProps } from "./TaskListItem";

// AssignedTaskListItem does not have access to SelectedTasksProvider and UpdateTaskStatusesProvider
export const AssignedTaskListItem = (
  props: Omit<TaskListItemProps, "showCheckbox">,
) => {
  return (
    <TaskItemPendingOverlay taskId={props.id}>
      <TaskListItemInner {...props} />
    </TaskItemPendingOverlay>
  );
};
