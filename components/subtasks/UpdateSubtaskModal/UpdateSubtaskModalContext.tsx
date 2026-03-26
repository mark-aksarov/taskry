"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const UpdateSubtaskModalContext = createContext<ModalContextType>(null);

interface UpdateSubtaskModalProviderProps {
  children: React.ReactNode;
}

export function UpdateSubtaskModalProvider({
  children,
}: UpdateSubtaskModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <UpdateSubtaskModalContext.Provider value={contextValue}>
      {children}
    </UpdateSubtaskModalContext.Provider>
  );
}

export function useUpdateSubtaskModal() {
  const context = useContext(UpdateSubtaskModalContext);
  if (!context) {
    throw new Error(
      "useUpdateSubtaskModal must be used within a UpdateSubtaskModalProvider",
    );
  }
  return context;
}
