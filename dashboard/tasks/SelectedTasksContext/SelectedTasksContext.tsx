"use client";

import { createContext, useContext } from "react";
import { TaskStatus } from "@/generated/prisma/enums";
import { useSelectedItemsState } from "@/lib/hooks/useSelectedItemsState";

interface SelectedTask {
  id: number;
  status: TaskStatus;
}

const SelectedTasksContext = createContext<ReturnType<
  typeof useSelectedItemsState<SelectedTask>
> | null>(null);

interface SelectedTasksProviderProps {
  pageItems: SelectedTask[];
  children: React.ReactNode;
}

export function SelectedTasksProvider({
  pageItems,
  children,
}: SelectedTasksProviderProps) {
  const value = useSelectedItemsState<SelectedTask>(pageItems);

  return (
    <SelectedTasksContext.Provider value={value}>
      {children}
    </SelectedTasksContext.Provider>
  );
}

export function useSelectedTasks() {
  const context = useContext(SelectedTasksContext);
  if (!context) {
    throw new Error("useSelectedTasks must be used inside provider");
  }
  return context;
}
