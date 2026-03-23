"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const DeleteCustomerImageModalContext = createContext<ModalContextType>(null);

interface DeleteCustomerImageModalProviderProps {
  children: React.ReactNode;
}

export function DeleteCustomerImageModalProvider({
  children,
}: DeleteCustomerImageModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <DeleteCustomerImageModalContext.Provider value={contextValue}>
      {children}
    </DeleteCustomerImageModalContext.Provider>
  );
}

export function useDeleteCustomerImageModal() {
  const context = useContext(DeleteCustomerImageModalContext);
  if (!context) {
    throw new Error(
      "useDeleteCustomerImageModal must be used within a DeleteCustomerImageModalProvider",
    );
  }
  return context;
}
