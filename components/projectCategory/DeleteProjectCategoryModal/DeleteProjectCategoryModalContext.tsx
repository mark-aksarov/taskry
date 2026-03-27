"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const DeleteProjectCategoryModalContext = createContext<ModalContextType>(null);

interface DeleteProjectCategoryModalProviderProps {
  children: React.ReactNode;
}

export function DeleteProjectCategoryModalProvider({
  children,
}: DeleteProjectCategoryModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <DeleteProjectCategoryModalContext.Provider value={contextValue}>
      {children}
    </DeleteProjectCategoryModalContext.Provider>
  );
}

export function useDeleteProjectCategoryModal() {
  const context = useContext(DeleteProjectCategoryModalContext);
  if (!context) {
    throw new Error(
      "useDeleteProjectCategoryModal must be used within a DeleteProjectCategoryModalProvider",
    );
  }
  return context;
}
