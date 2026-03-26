"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const UpdateTaskCategoryModalContext = createContext<ModalContextType>(null);

interface UpdateTaskCategoryModalProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskCategoryModalProvider({
  children,
}: UpdateTaskCategoryModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <UpdateTaskCategoryModalContext.Provider value={contextValue}>
      {children}
    </UpdateTaskCategoryModalContext.Provider>
  );
}

export function useUpdateTaskCategoryModal() {
  const context = useContext(UpdateTaskCategoryModalContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskCategoryModal must be used within a UpdateTaskCategoryModalProvider",
    );
  }
  return context;
}
