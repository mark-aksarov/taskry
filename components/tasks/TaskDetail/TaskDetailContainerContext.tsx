"use client";

import { createContext, useContext } from "react";
import { TaskDetailContainer as DefaultTaskDetailContainer } from "./TaskDetailContainer";

type TaskDetailContainerType = React.ComponentType<{ taskId: number }>;

const TaskDetailContainerContext =
  createContext<TaskDetailContainerType | null>(null);

interface TaskDetailContainerProviderProps {
  TaskDetailContainer?: TaskDetailContainerType;
  children: React.ReactNode;
}

export function TaskDetailContainerProvider({
  TaskDetailContainer = DefaultTaskDetailContainer,
  children,
}: TaskDetailContainerProviderProps) {
  return (
    <TaskDetailContainerContext.Provider value={TaskDetailContainer}>
      {children}
    </TaskDetailContainerContext.Provider>
  );
}

export function useTaskDetailContainer(): TaskDetailContainerType {
  const context = useContext(TaskDetailContainerContext);
  if (!context) {
    throw new Error(
      "useTaskDetailContainer must be used within a TaskDetailContainerProvider",
    );
  }
  return context;
}
