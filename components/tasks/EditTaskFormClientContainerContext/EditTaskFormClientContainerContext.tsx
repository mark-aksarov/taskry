"use client";

import { createContext } from "react";

type EditTaskFormClientContainerType = React.ComponentType<{
  taskId: number;
}>;

export const EditTaskFormClientContainerContext =
  createContext<EditTaskFormClientContainerType | null>(null);

export function EditTaskFormClientContainerProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: EditTaskFormClientContainerType;
}) {
  return (
    <EditTaskFormClientContainerContext.Provider value={value}>
      {children}
    </EditTaskFormClientContainerContext.Provider>
  );
}
