"use client";

import { createContext } from "react";
import { TaskDetailClientContainer as DefaultTaskDetailClientContainer } from "./TaskDetailClientContainer";

type TaskDetailClientContainerType = React.ComponentType<{ taskId: number }>;

export const TaskDetailClientContainerContext =
  createContext<TaskDetailClientContainerType>(
    DefaultTaskDetailClientContainer,
  );
