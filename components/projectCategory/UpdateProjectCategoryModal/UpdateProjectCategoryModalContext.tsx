"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const UpdateProjectCategoryModalContext = createContext<ModalContextType>(null);

interface UpdateProjectCategoryModalProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectCategoryModalProvider({
  children,
}: UpdateProjectCategoryModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <UpdateProjectCategoryModalContext.Provider value={contextValue}>
      {children}
    </UpdateProjectCategoryModalContext.Provider>
  );
}

export function useUpdateProjectCategoryModal() {
  const context = useContext(UpdateProjectCategoryModalContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectCategoryModal must be used within a UpdateProjectCategoryModalProvider",
    );
  }
  return context;
}
