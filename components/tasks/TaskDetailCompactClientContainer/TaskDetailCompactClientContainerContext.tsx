"use client";

import { createContext } from "react";
import { TaskDetailCompactClientContainer as DefaultTaskDetailCompactClientContainer } from "./TaskDetailCompactClientContainer";

type TaskDetailCompactClientContainerType = React.ComponentType<{
  taskId: number;
}>;

export const TaskDetailCompactClientContainerContext =
  createContext<TaskDetailCompactClientContainerType>(
    DefaultTaskDetailCompactClientContainer,
  );
