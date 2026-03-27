"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const UpdateUserModalContext = createContext<ModalContextType>(null);

interface UpdateUserModalProviderProps {
  children: React.ReactNode;
}

export function UpdateUserModalProvider({
  children,
}: UpdateUserModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <UpdateUserModalContext.Provider value={contextValue}>
      {children}
    </UpdateUserModalContext.Provider>
  );
}

export function useUpdateUserModal() {
  const context = useContext(UpdateUserModalContext);
  if (!context) {
    throw new Error(
      "useUpdateUserModal must be used within a UpdateUserModalProvider",
    );
  }
  return context;
}
