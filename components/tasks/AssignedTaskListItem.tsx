"use client";

import { TaskItemPendingOverlay } from "./TaskItem";
import { DeleteTaskProvider } from "./DeleteTaskContext";
import { UpdateTaskProvider } from "./UpdateTaskContext";
import { UpdateTaskStatusProvider } from "./UpdateTaskStatusContext";
import { TaskListItemInner, TaskListItemProps } from "./TaskListItem";

// AssignedTaskListItem does not have access to SelectedTasksProvider and UpdateTaskStatusesProvider
export const AssignedTaskListItem = ({
  updateTask,
  deleteTask,
  updateTaskStatus,
  ...props
}: Omit<TaskListItemProps, "showCheckbox">) => {
  return (
    <DeleteTaskProvider deleteTask={deleteTask}>
      <UpdateTaskProvider updateTask={updateTask}>
        <UpdateTaskStatusProvider updateTaskStatus={updateTaskStatus}>
          <TaskItemPendingOverlay taskId={props.id}>
            <TaskListItemInner {...props} />
          </TaskItemPendingOverlay>
        </UpdateTaskStatusProvider>
      </UpdateTaskProvider>
    </DeleteTaskProvider>
  );
};
