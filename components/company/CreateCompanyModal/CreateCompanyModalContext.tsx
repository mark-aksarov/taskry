"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const CreateCompanyModalContext = createContext<ModalContextType>(null);

interface CreateCompanyModalProviderProps {
  children: React.ReactNode;
}

export function CreateCompanyModalProvider({
  children,
}: CreateCompanyModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <CreateCompanyModalContext.Provider value={contextValue}>
      {children}
    </CreateCompanyModalContext.Provider>
  );
}

export function useCreateCompanyModal() {
  const context = useContext(CreateCompanyModalContext);
  if (!context) {
    throw new Error(
      "useCreateCompanyModal must be used within a CreateCompanyModalProvider",
    );
  }
  return context;
}
