"use client";

import { createContext } from "react";
import { TaskCommentsClientContainer as DefaultTaskCommentsClientContainer } from "./TaskCommentsClientContainer";

type TaskCommentsClientContainerType = React.ComponentType<{
  taskId: number;
}>;

export const TaskCommentsClientContainerContext =
  createContext<TaskCommentsClientContainerType>(
    DefaultTaskCommentsClientContainer,
  );
