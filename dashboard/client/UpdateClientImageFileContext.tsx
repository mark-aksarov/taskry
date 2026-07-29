"use client";

import {
  ImageFileContextType,
  useImageFileContextValue,
} from "@/dashboard/common/ImageFileContext";
import { createContext, useContext } from "react";

const UpdateClientImageFileContext = createContext<ImageFileContextType>(null);

interface UpdateClientImageFileProviderProps {
  children: React.ReactNode;
}

export function UpdateClientImageFileProvider({
  children,
}: UpdateClientImageFileProviderProps) {
  const contextValue = useImageFileContextValue();

  return (
    <UpdateClientImageFileContext.Provider value={contextValue}>
      {children}
    </UpdateClientImageFileContext.Provider>
  );
}

export function useUpdateClientImageFile() {
  const context = useContext(UpdateClientImageFileContext);
  if (!context) {
    throw new Error(
      "useUpdateClientImageFile must be used within a UpdateClientImageFileProvider",
    );
  }
  return context;
}
