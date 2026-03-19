"use client";

import { useContext, createContext, useState, useMemo } from "react";

interface TaskCategoryCheckboxGroup {
  value: string[];
  updateValue: (value: string[]) => void;
}

const TaskCategoryCheckboxGroupContext =
  createContext<TaskCategoryCheckboxGroup | null>(null);

interface TaskCategoryCheckboxGroupProviderProps {
  initialCategoryIds?: number[];
  children: React.ReactNode;
}

export const TaskCategoryCheckboxGroupProvider = ({
  initialCategoryIds,
  children,
}: TaskCategoryCheckboxGroupProviderProps) => {
  const [value, setValue] = useState(
    initialCategoryIds ? initialCategoryIds.map((id) => id.toString()) : [],
  );

  const contextValue = useMemo(
    () => ({
      value,
      updateValue: setValue,
    }),
    [value],
  );

  return (
    <TaskCategoryCheckboxGroupContext.Provider value={contextValue}>
      {children}
    </TaskCategoryCheckboxGroupContext.Provider>
  );
};

export function useTaskCategoryCheckboxGroup() {
  const context = useContext(TaskCategoryCheckboxGroupContext);
  if (context === null) {
    throw new Error(
      "useTaskCategoryCheckboxGroup must be used within a TaskCategoryCheckboxGroupProvider",
    );
  }
  return context;
}
