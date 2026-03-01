"use client";

import { TaskItemPendingOverlay } from "./TaskItem";
import { DeleteTaskTransitionProvider } from "./DeleteTaskTransitionContext";
import { UpdateTaskTransitionProvider } from "./UpdateTaskTransitionContext";
import { TaskListItem, TaskListItemProps } from "./TaskListItem/TaskListItem";
import { UpdateTaskStatusTransitionProvider } from "./UpdateTaskStatusTransitionContext";

// AssignedTaskListItem does not have access to SelectedTasksProvider and UpdateTaskStatusesProvider
export const AssignedTaskListItem = (
  props: Omit<TaskListItemProps, "showCheckbox">,
) => {
  return (
    <DeleteTaskTransitionProvider>
      <UpdateTaskTransitionProvider>
        <UpdateTaskStatusTransitionProvider>
          <TaskItemPendingOverlay taskId={props.id}>
            <TaskListItem {...props} />
          </TaskItemPendingOverlay>
        </UpdateTaskStatusTransitionProvider>
      </UpdateTaskTransitionProvider>
    </DeleteTaskTransitionProvider>
  );
};
