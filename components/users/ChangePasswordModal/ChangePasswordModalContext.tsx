"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const ChangePasswordModalContext = createContext<ModalContextType>(null);

interface ChangePasswordModalProviderProps {
  children: React.ReactNode;
}

export function ChangePasswordModalProvider({
  children,
}: ChangePasswordModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <ChangePasswordModalContext.Provider value={contextValue}>
      {children}
    </ChangePasswordModalContext.Provider>
  );
}

export function useChangePasswordModal() {
  const context = useContext(ChangePasswordModalContext);
  if (!context) {
    throw new Error(
      "useChangePasswordModal must be used within a ChangePasswordModalProvider",
    );
  }
  return context;
}
