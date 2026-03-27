"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const CreateUserModalContext = createContext<ModalContextType>(null);

interface CreateUserModalProviderProps {
  children: React.ReactNode;
}

export function CreateUserModalProvider({
  children,
}: CreateUserModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <CreateUserModalContext.Provider value={contextValue}>
      {children}
    </CreateUserModalContext.Provider>
  );
}

export function useCreateUserModal() {
  const context = useContext(CreateUserModalContext);
  if (!context) {
    throw new Error(
      "useCreateUserModal must be used within a CreateUserModalProvider",
    );
  }
  return context;
}
