"use client";

import { TaskListItem } from "./TaskListItem";
import { DeleteTaskProvider } from "./DeleteTaskContext";
import { UpdateTaskProvider } from "./UpdateTaskContext";
import { TaskItemPendingOverlay, TaskItemProps } from "./TaskItem";
import { UpdateTaskStatusProvider } from "./UpdateTaskStatusContext";

// AssignedTaskListItem does not have access to SelectedTasksProvider and UpdateTaskStatusesProvider
export const AssignedTaskListItem = ({
  updateTask,
  deleteTask,
  updateTaskStatus,
  ...props
}: Omit<TaskItemProps, "showCheckbox" | "subtasksTotal" | "subtasksDone">) => {
  return (
    <DeleteTaskProvider deleteTask={deleteTask}>
      <UpdateTaskProvider taskId={props.id} updateTask={updateTask}>
        <UpdateTaskStatusProvider updateTaskStatus={updateTaskStatus}>
          <TaskItemPendingOverlay taskId={props.id}>
            <TaskListItem {...props} />
          </TaskItemPendingOverlay>
        </UpdateTaskStatusProvider>
      </UpdateTaskProvider>
    </DeleteTaskProvider>
  );
};
