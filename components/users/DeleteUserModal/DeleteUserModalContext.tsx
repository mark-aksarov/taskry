"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const DeleteUserModalContext = createContext<ModalContextType>(null);

interface DeleteUserModalProviderProps {
  children: React.ReactNode;
}

export function DeleteUserModalProvider({
  children,
}: DeleteUserModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <DeleteUserModalContext.Provider value={contextValue}>
      {children}
    </DeleteUserModalContext.Provider>
  );
}

export function useDeleteUserModal() {
  const context = useContext(DeleteUserModalContext);
  if (!context) {
    throw new Error(
      "useDeleteUserModal must be used within a DeleteUserModalProvider",
    );
  }
  return context;
}
