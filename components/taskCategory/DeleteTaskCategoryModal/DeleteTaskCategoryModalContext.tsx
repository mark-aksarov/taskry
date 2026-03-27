"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const DeleteTaskCategoryModalContext = createContext<ModalContextType>(null);

interface DeleteTaskCategoryModalProviderProps {
  children: React.ReactNode;
}

export function DeleteTaskCategoryModalProvider({
  children,
}: DeleteTaskCategoryModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <DeleteTaskCategoryModalContext.Provider value={contextValue}>
      {children}
    </DeleteTaskCategoryModalContext.Provider>
  );
}

export function useDeleteTaskCategoryModal() {
  const context = useContext(DeleteTaskCategoryModalContext);
  if (!context) {
    throw new Error(
      "useDeleteTaskCategoryModal must be used within a DeleteTaskCategoryModalProvider",
    );
  }
  return context;
}
