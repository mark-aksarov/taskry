"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const DeleteUserImageModalContext = createContext<ModalContextType>(null);

interface DeleteUserImageModalProviderProps {
  children: React.ReactNode;
}

export function DeleteUserImageModalProvider({
  children,
}: DeleteUserImageModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <DeleteUserImageModalContext.Provider value={contextValue}>
      {children}
    </DeleteUserImageModalContext.Provider>
  );
}

export function useDeleteUserImageModal() {
  const context = useContext(DeleteUserImageModalContext);
  if (!context) {
    throw new Error(
      "useDeleteUserImageModal must be used within a DeleteUserImageModalProvider",
    );
  }
  return context;
}
