"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const UpdatePositionModalContext = createContext<ModalContextType>(null);

interface UpdatePositionModalProviderProps {
  children: React.ReactNode;
}

export function UpdatePositionModalProvider({
  children,
}: UpdatePositionModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <UpdatePositionModalContext.Provider value={contextValue}>
      {children}
    </UpdatePositionModalContext.Provider>
  );
}

export function useUpdatePositionModal() {
  const context = useContext(UpdatePositionModalContext);
  if (!context) {
    throw new Error(
      "useUpdatePositionModal must be used within a UpdatePositionModalProvider",
    );
  }
  return context;
}
