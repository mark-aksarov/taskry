"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const CustomerFiltersModalContext = createContext<ModalContextType>(null);

interface CustomerFiltersModalProviderProps {
  children: React.ReactNode;
}

export function CustomerFiltersModalProvider({
  children,
}: CustomerFiltersModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <CustomerFiltersModalContext.Provider value={contextValue}>
      {children}
    </CustomerFiltersModalContext.Provider>
  );
}

export function useCustomerFiltersModal() {
  const context = useContext(CustomerFiltersModalContext);
  if (!context) {
    throw new Error(
      "useCustomerFiltersModal must be used within a CustomerFiltersModalProvider",
    );
  }
  return context;
}
