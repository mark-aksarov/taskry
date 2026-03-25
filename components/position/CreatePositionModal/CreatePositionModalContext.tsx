"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const CreatePositionModalContext = createContext<ModalContextType>(null);

interface CreatePositionModalProviderProps {
  children: React.ReactNode;
}

export function CreatePositionModalProvider({
  children,
}: CreatePositionModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <CreatePositionModalContext.Provider value={contextValue}>
      {children}
    </CreatePositionModalContext.Provider>
  );
}

export function useCreatePositionModal() {
  const context = useContext(CreatePositionModalContext);
  if (!context) {
    throw new Error(
      "useCreatePositionModal must be used within a CreatePositionModalProvider",
    );
  }
  return context;
}
