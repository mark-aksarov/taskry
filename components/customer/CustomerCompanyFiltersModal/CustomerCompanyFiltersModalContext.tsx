"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const CustomerCompanyFiltersModalContext =
  createContext<ModalContextType>(null);

interface CustomerCompanyFiltersModalProviderProps {
  children: React.ReactNode;
}

export function CustomerCompanyFiltersModalProvider({
  children,
}: CustomerCompanyFiltersModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <CustomerCompanyFiltersModalContext.Provider value={contextValue}>
      {children}
    </CustomerCompanyFiltersModalContext.Provider>
  );
}

export function useCustomerCompanyFiltersModal() {
  const context = useContext(CustomerCompanyFiltersModalContext);
  if (!context) {
    throw new Error(
      "useCustomerCompanyFiltersModal must be used within a CustomerCompanyFiltersModalProvider",
    );
  }
  return context;
}
