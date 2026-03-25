"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const CreateProjectCategoryModalContext = createContext<ModalContextType>(null);

interface CreateProjectCategoryModalProviderProps {
  children: React.ReactNode;
}

export function CreateProjectCategoryModalProvider({
  children,
}: CreateProjectCategoryModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <CreateProjectCategoryModalContext.Provider value={contextValue}>
      {children}
    </CreateProjectCategoryModalContext.Provider>
  );
}

export function useCreateProjectCategoryModal() {
  const context = useContext(CreateProjectCategoryModalContext);
  if (!context) {
    throw new Error(
      "useCreateProjectCategoryModal must be used within a CreateProjectCategoryModalProvider",
    );
  }
  return context;
}
