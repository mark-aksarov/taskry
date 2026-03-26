"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const DeleteProjectModalContext = createContext<ModalContextType>(null);

interface DeleteProjectModalProviderProps {
  children: React.ReactNode;
}

export function DeleteProjectModalProvider({
  children,
}: DeleteProjectModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <DeleteProjectModalContext.Provider value={contextValue}>
      {children}
    </DeleteProjectModalContext.Provider>
  );
}

export function useDeleteProjectModal() {
  const context = useContext(DeleteProjectModalContext);
  if (!context) {
    throw new Error(
      "useDeleteProjectModal must be used within a DeleteProjectModalProvider",
    );
  }
  return context;
}
