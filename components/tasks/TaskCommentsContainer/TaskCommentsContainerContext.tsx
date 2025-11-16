"use client";

import { createContext, useContext } from "react";
import { TaskCommentsContainer as DefaultTaskCommentsContainer } from "./TaskCommentsContainer";

type TaskCommentsContainerType = React.ComponentType<{ taskId: number }>;

const TaskCommentsContainerContext =
  createContext<TaskCommentsContainerType | null>(null);

interface TaskCommentsContainerProviderProps {
  TaskCommentsContainer?: TaskCommentsContainerType;
  children: React.ReactNode;
}

export function TaskCommentsContainerProvider({
  TaskCommentsContainer = DefaultTaskCommentsContainer,
  children,
}: TaskCommentsContainerProviderProps) {
  return (
    <TaskCommentsContainerContext.Provider value={TaskCommentsContainer}>
      {children}
    </TaskCommentsContainerContext.Provider>
  );
}

export function useTaskCommentsContainer(): TaskCommentsContainerType {
  const context = useContext(TaskCommentsContainerContext);
  if (!context) {
    throw new Error(
      "useTaskCommentsContainer must be used within a TaskCommentsContainerProvider",
    );
  }
  return context;
}
