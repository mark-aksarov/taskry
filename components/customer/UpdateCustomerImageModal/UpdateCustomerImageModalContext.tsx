"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

export const UpdateCustomerImageModalContext =
  createContext<ModalContextType>(null);

interface UpdateCustomerImageModalProviderProps {
  children: React.ReactNode;
}

export function UpdateCustomerImageModalProvider({
  children,
}: UpdateCustomerImageModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <UpdateCustomerImageModalContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerImageModalContext.Provider>
  );
}

export function useUpdateCustomerImageModal() {
  const context = useContext(UpdateCustomerImageModalContext);
  if (!context) {
    throw new Error(
      "useUpdateCustomerImageModal must be used within a UpdateCustomerImageModalProvider",
    );
  }
  return context;
}
