"use client";

import { createContext } from "react";
import { TaskDetailCompactContainer as DefaultTaskDetailCompactContainer } from "./TaskDetailCompactContainer";

type TaskDetailCompactContainerType = React.ComponentType<{
  taskId: number;
}>;

export const TaskDetailCompactContainerContext =
  createContext<TaskDetailCompactContainerType>(
    DefaultTaskDetailCompactContainer,
  );
