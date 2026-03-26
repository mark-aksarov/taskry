"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const DeleteCustomerModalContext = createContext<ModalContextType>(null);

interface DeleteCustomerModalProviderProps {
  children: React.ReactNode;
}

export function DeleteCustomerModalProvider({
  children,
}: DeleteCustomerModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <DeleteCustomerModalContext.Provider value={contextValue}>
      {children}
    </DeleteCustomerModalContext.Provider>
  );
}

export function useDeleteCustomerModal() {
  const context = useContext(DeleteCustomerModalContext);
  if (!context) {
    throw new Error(
      "useDeleteCustomerModal must be used within a DeleteCustomerModalProvider",
    );
  }
  return context;
}
