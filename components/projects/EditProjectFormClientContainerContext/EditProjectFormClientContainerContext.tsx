"use client";

import { createContext } from "react";

type EditProjectFormClientContainerType = React.ComponentType<{
  projectId: number;
}>;

export const EditProjectFormClientContainerContext =
  createContext<EditProjectFormClientContainerType | null>(null);

export function EditProjectFormClientContainerProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: EditProjectFormClientContainerType;
}) {
  return (
    <EditProjectFormClientContainerContext.Provider value={value}>
      {children}
    </EditProjectFormClientContainerContext.Provider>
  );
}
