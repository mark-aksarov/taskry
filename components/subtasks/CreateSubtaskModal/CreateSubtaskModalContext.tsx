"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const CreateSubtaskModalContext = createContext<ModalContextType>(null);

interface CreateSubtaskModalProviderProps {
  children: React.ReactNode;
}

export function CreateSubtaskModalProvider({
  children,
}: CreateSubtaskModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <CreateSubtaskModalContext.Provider value={contextValue}>
      {children}
    </CreateSubtaskModalContext.Provider>
  );
}

export function useCreateSubtaskModal() {
  const context = useContext(CreateSubtaskModalContext);
  if (!context) {
    throw new Error(
      "useCreateSubtaskModal must be used within a CreateSubtaskModalProvider",
    );
  }
  return context;
}
