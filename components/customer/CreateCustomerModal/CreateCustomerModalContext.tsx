"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const CreateCustomerModalContext = createContext<ModalContextType>(null);

interface CreateCustomerModalProviderProps {
  children: React.ReactNode;
}

export function CreateCustomerModalProvider({
  children,
}: CreateCustomerModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <CreateCustomerModalContext.Provider value={contextValue}>
      {children}
    </CreateCustomerModalContext.Provider>
  );
}

export function useCreateCustomerModal() {
  const context = useContext(CreateCustomerModalContext);
  if (!context) {
    throw new Error(
      "useCreateCustomerModal must be used within a CreateCustomerModalProvider",
    );
  }
  return context;
}
