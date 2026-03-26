"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const CreateTaskCategoryModalContext = createContext<ModalContextType>(null);

interface CreateTaskCategoryModalProviderProps {
  children: React.ReactNode;
}

export function CreateTaskCategoryModalProvider({
  children,
}: CreateTaskCategoryModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <CreateTaskCategoryModalContext.Provider value={contextValue}>
      {children}
    </CreateTaskCategoryModalContext.Provider>
  );
}

export function useCreateTaskCategoryModal() {
  const context = useContext(CreateTaskCategoryModalContext);
  if (!context) {
    throw new Error(
      "useCreateTaskCategoryModal must be used within a CreateTaskCategoryModalProvider",
    );
  }
  return context;
}
