"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const UpdateProjectModalContext = createContext<ModalContextType>(null);

interface UpdateProjectModalProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectModalProvider({
  children,
}: UpdateProjectModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <UpdateProjectModalContext.Provider value={contextValue}>
      {children}
    </UpdateProjectModalContext.Provider>
  );
}

export function useUpdateProjectModal() {
  const context = useContext(UpdateProjectModalContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectModal must be used within a UpdateProjectModalProvider",
    );
  }
  return context;
}
