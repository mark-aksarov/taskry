"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

export const UpdateUserImageModalContext =
  createContext<ModalContextType>(null);

interface UpdateUserImageModalProviderProps {
  children: React.ReactNode;
}

export function UpdateUserImageModalProvider({
  children,
}: UpdateUserImageModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <UpdateUserImageModalContext.Provider value={contextValue}>
      {children}
    </UpdateUserImageModalContext.Provider>
  );
}

export function useUpdateUserImageModal() {
  const context = useContext(UpdateUserImageModalContext);
  if (!context) {
    throw new Error(
      "useUpdateUserImageModal must be used within a UpdateUserImageModalProvider",
    );
  }
  return context;
}
