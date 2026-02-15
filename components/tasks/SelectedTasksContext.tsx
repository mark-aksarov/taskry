"use client";

import { TaskStatus } from "@/generated/prisma/enums";
import React, { createContext, useContext } from "react";
import { useSelectedItemsState } from "@/lib/hooks/useSelectedItemsState";

export interface SelectedTask {
  id: number;
  status: TaskStatus;
}

export interface SelectedTasksContextType {
  add: (item: SelectedTask) => void;
  update: (id: number, updatedItem: Partial<SelectedTask>) => void;
  remove: (id: number) => void;
  get: (id: number) => SelectedTask | undefined;
  clear: () => void;
  items: SelectedTask[];
  ids: number[];
}

export const SelectedTasksContext =
  createContext<SelectedTasksContextType | null>(null);

export const SelectedTasksProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useSelectedItemsState<SelectedTask>();

  return (
    <SelectedTasksContext.Provider value={value}>
      {children}
    </SelectedTasksContext.Provider>
  );
};

export const useSelectedTasks = () => {
  const context = useContext(SelectedTasksContext);

  if (!context) {
    throw new Error(
      "useSelectedTasks must be used within SelectedTasksProvider",
    );
  }

  return context;
};
