"use client";

import { createContext } from "react";

type EditTaskFormContainerType = React.ComponentType<{
  taskId: number;
}>;

export const EditTaskFormContainerContext =
  createContext<EditTaskFormContainerType | null>(null);

export function EditTaskFormContainerProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: EditTaskFormContainerType;
}) {
  return (
    <EditTaskFormContainerContext.Provider value={value}>
      {children}
    </EditTaskFormContainerContext.Provider>
  );
}
