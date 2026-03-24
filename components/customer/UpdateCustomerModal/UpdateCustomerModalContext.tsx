"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const UpdateCustomerModalContext = createContext<ModalContextType>(null);

interface UpdateCustomerModalProviderProps {
  children: React.ReactNode;
}

export function UpdateCustomerModalProvider({
  children,
}: UpdateCustomerModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <UpdateCustomerModalContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerModalContext.Provider>
  );
}

export function useUpdateCustomerModal() {
  const context = useContext(UpdateCustomerModalContext);
  if (!context) {
    throw new Error(
      "useUpdateCustomerModal must be used within a UpdateCustomerModalProvider",
    );
  }
  return context;
}
