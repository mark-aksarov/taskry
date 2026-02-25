"use client";

import {
  TaskListItemInner,
  TaskListItemProps,
} from "./TaskListItem/TaskListItem";

import { UpdateTaskStatusProvider } from "./UpdateTaskStatusContext";

export const AssignedTaskListItem = ({
  updateTaskStatus,
  ...props
}: Omit<TaskListItemProps, "showCheckbox">) => {
  return (
    <UpdateTaskStatusProvider updateStatus={updateTaskStatus}>
      <TaskListItemInner {...props} />
    </UpdateTaskStatusProvider>
  );
};
