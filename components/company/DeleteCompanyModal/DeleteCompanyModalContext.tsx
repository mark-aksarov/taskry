"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const DeleteCompanyModalContext = createContext<ModalContextType>(null);

interface DeleteCompanyModalProviderProps {
  children: React.ReactNode;
}

export function DeleteCompanyModalProvider({
  children,
}: DeleteCompanyModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <DeleteCompanyModalContext.Provider value={contextValue}>
      {children}
    </DeleteCompanyModalContext.Provider>
  );
}

export function useDeleteCompanyModal() {
  const context = useContext(DeleteCompanyModalContext);
  if (!context) {
    throw new Error(
      "useDeleteCompanyModal must be used within a DeleteCompanyModalProvider",
    );
  }
  return context;
}
