"use client";

import { createContext } from "react";
import { TaskCommentsContainer as DefaultTaskCommentsContainer } from "./TaskCommentsContainer";

type TaskCommentsContainerType = React.ComponentType<{
  taskId: number;
}>;

export const TaskCommentsContainerContext =
  createContext<TaskCommentsContainerType>(DefaultTaskCommentsContainer);
