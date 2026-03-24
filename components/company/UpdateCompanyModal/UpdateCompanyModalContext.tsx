"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const UpdateCompanyModalContext = createContext<ModalContextType>(null);

interface UpdateCompanyModalProviderProps {
  children: React.ReactNode;
}

export function UpdateCompanyModalProvider({
  children,
}: UpdateCompanyModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <UpdateCompanyModalContext.Provider value={contextValue}>
      {children}
    </UpdateCompanyModalContext.Provider>
  );
}

export function useUpdateCompanyModal() {
  const context = useContext(UpdateCompanyModalContext);
  if (!context) {
    throw new Error(
      "useUpdateCompanyModal must be used within a UpdateCompanyModalProvider",
    );
  }
  return context;
}
