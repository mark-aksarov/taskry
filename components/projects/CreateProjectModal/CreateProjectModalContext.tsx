"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const CreateProjectModalContext = createContext<ModalContextType>(null);

interface CreateProjectModalProviderProps {
  children: React.ReactNode;
}

export function CreateProjectModalProvider({
  children,
}: CreateProjectModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <CreateProjectModalContext.Provider value={contextValue}>
      {children}
    </CreateProjectModalContext.Provider>
  );
}

export function useCreateProjectModal() {
  const context = useContext(CreateProjectModalContext);
  if (!context) {
    throw new Error(
      "useCreateProjectModal must be used within a CreateProjectModalProvider",
    );
  }
  return context;
}
