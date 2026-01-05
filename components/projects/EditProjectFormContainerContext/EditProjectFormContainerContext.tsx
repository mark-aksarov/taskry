"use client";

import { createContext } from "react";

type EditProjectFormContainerType = React.ComponentType<{
  projectId: number;
}>;

export const EditProjectFormContainerContext =
  createContext<EditProjectFormContainerType | null>(null);

export function EditProjectFormContainerProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: EditProjectFormContainerType;
}) {
  return (
    <EditProjectFormContainerContext.Provider value={value}>
      {children}
    </EditProjectFormContainerContext.Provider>
  );
}
