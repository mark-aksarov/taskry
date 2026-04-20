"use client";

import {
  ImageFileContextType,
  useImageFileContextValue,
} from "@/dashboard/common/ImageFileContext";
import { createContext, useContext } from "react";

export const UpdateCustomerImageFileContext =
  createContext<ImageFileContextType>(null);

interface UpdateCustomerImageFileProviderProps {
  children: React.ReactNode;
}

export function UpdateCustomerImageFileProvider({
  children,
}: UpdateCustomerImageFileProviderProps) {
  const contextValue = useImageFileContextValue();

  return (
    <UpdateCustomerImageFileContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerImageFileContext.Provider>
  );
}

export function useUpdateCustomerImageFile() {
  const context = useContext(UpdateCustomerImageFileContext);
  if (!context) {
    throw new Error(
      "useUpdateCustomerImageFile must be used within a UpdateCustomerImageFileProvider",
    );
  }
  return context;
}
