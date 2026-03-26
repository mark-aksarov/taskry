"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const CustomerDetailModalContext = createContext<ModalContextType>(null);

interface CustomerDetailModalProviderProps {
  children: React.ReactNode;
}

export function CustomerDetailModalProvider({
  children,
}: CustomerDetailModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <CustomerDetailModalContext.Provider value={contextValue}>
      {children}
    </CustomerDetailModalContext.Provider>
  );
}

export function useCustomerDetailModal() {
  const context = useContext(CustomerDetailModalContext);
  if (!context) {
    throw new Error(
      "useCustomerDetailModal must be used within a CustomerDetailModalProvider",
    );
  }
  return context;
}
