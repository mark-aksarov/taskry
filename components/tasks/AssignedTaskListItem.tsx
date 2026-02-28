"use client";

import {
  TaskListItemInner,
  TaskListItemProps,
} from "./TaskListItem/TaskListItem";

import { DeleteTaskProvider } from "./DeleteTaskContext";
import { TaskItemDeleteOverlay } from "./TaskItemDeleteOverlay";
import { UpdateTaskStatusProvider } from "./UpdateTaskStatusContext";

export const AssignedTaskListItem = ({
  updateTaskStatus,
  deleteTask,
  ...props
}: Omit<TaskListItemProps, "showCheckbox">) => {
  return (
    <DeleteTaskProvider deleteTask={deleteTask}>
      <UpdateTaskStatusProvider updateStatus={updateTaskStatus}>
        <TaskItemDeleteOverlay>
          <TaskListItemInner {...props} />
        </TaskItemDeleteOverlay>
      </UpdateTaskStatusProvider>
    </DeleteTaskProvider>
  );
};
