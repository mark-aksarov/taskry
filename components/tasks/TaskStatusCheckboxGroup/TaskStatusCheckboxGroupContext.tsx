"use client";

import { TaskStatus } from "@/generated/prisma/enums";
import { useContext, createContext, useState, useMemo } from "react";

interface TaskStatusCheckboxGroup {
  value: string[];
  updateValue: (value: string[]) => void;
}

const TaskStatusCheckboxGroupContext =
  createContext<TaskStatusCheckboxGroup | null>(null);

interface TaskStatusCheckboxGroupProviderProps {
  initialStatuses?: TaskStatus[];
  children: React.ReactNode;
}

export const TaskStatusCheckboxGroupProvider = ({
  initialStatuses,
  children,
}: TaskStatusCheckboxGroupProviderProps) => {
  const [value, setValue] = useState(
    initialStatuses ? initialStatuses.map((status) => status.toString()) : [],
  );

  const contextValue = useMemo(
    () => ({
      value,
      updateValue: setValue,
    }),
    [value],
  );

  return (
    <TaskStatusCheckboxGroupContext.Provider value={contextValue}>
      {children}
    </TaskStatusCheckboxGroupContext.Provider>
  );
};

export function useTaskStatusCheckboxGroup() {
  const context = useContext(TaskStatusCheckboxGroupContext);
  if (context === null) {
    throw new Error(
      "useTaskStatusCheckboxGroup must be used within a TaskStatusCheckboxGroupProvider",
    );
  }
  return context;
}
