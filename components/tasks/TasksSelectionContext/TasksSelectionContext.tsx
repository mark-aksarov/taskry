"use client";

import { createContext, useContext } from "react";
import { useSelection, UseSelectionType } from "@/lib/hooks/useSelection";

const TasksContext = createContext<UseSelectionType | null>(null);

export function TasksSelectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const selection = useSelection();
  return (
    <TasksContext.Provider value={selection}>{children}</TasksContext.Provider>
  );
}

export const useTasksSelection = () => {
  const context = useContext(TasksContext);
  if (!context)
    throw new Error(
      "useTasksSelection must be used within TasksSelectionProvider",
    );
  return context;
};
