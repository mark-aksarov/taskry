"use client";

import { createContext, useContext } from "react";
import { UpdateSubtasksFormContainer as DefaultUpdateSubtasksFormContainer } from "./UpdateSubtasksFormContainer";

type UpdateSubtasksFormContainerType = React.ComponentType<{ taskId: number }>;

const UpdateSubtasksFormContainerContext =
  createContext<UpdateSubtasksFormContainerType | null>(null);

interface UpdateSubtasksFormContainerProviderProps {
  UpdateSubtasksFormContainer?: UpdateSubtasksFormContainerType;
  children: React.ReactNode;
}

export function UpdateSubtasksFormContainerProvider({
  UpdateSubtasksFormContainer = DefaultUpdateSubtasksFormContainer,
  children,
}: UpdateSubtasksFormContainerProviderProps) {
  return (
    <UpdateSubtasksFormContainerContext.Provider
      value={UpdateSubtasksFormContainer}
    >
      {children}
    </UpdateSubtasksFormContainerContext.Provider>
  );
}

export function useUpdateSubtasksFormContainer(): UpdateSubtasksFormContainerType {
  const context = useContext(UpdateSubtasksFormContainerContext);
  if (!context) {
    throw new Error(
      "useUpdateSubtasksFormContainer must be used within a SubtasksFormContainerProvider",
    );
  }
  return context;
}
