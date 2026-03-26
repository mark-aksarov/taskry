"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const DeletePositionModalContext = createContext<ModalContextType>(null);

interface DeletePositionModalProviderProps {
  children: React.ReactNode;
}

export function DeletePositionModalProvider({
  children,
}: DeletePositionModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <DeletePositionModalContext.Provider value={contextValue}>
      {children}
    </DeletePositionModalContext.Provider>
  );
}

export function useDeletePositionModal() {
  const context = useContext(DeletePositionModalContext);
  if (!context) {
    throw new Error(
      "useDeletePositionModal must be used within a DeletePositionModalProvider",
    );
  }
  return context;
}
