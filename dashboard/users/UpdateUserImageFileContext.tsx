"use client";

import {
  ImageFileContextType,
  useImageFileContextValue,
} from "@/dashboard/common/ImageFileContext";
import { createContext, useContext } from "react";

export const UpdateUserImageFileContext =
  createContext<ImageFileContextType>(null);

interface UpdateUserImageFileProviderProps {
  children: React.ReactNode;
}

export function UpdateUserImageFileProvider({
  children,
}: UpdateUserImageFileProviderProps) {
  const contextValue = useImageFileContextValue();

  return (
    <UpdateUserImageFileContext.Provider value={contextValue}>
      {children}
    </UpdateUserImageFileContext.Provider>
  );
}

export function useUpdateUserImageFile() {
  const context = useContext(UpdateUserImageFileContext);
  if (!context) {
    throw new Error(
      "useUpdateUserImageFile must be used within a UpdateUserImageFileProvider",
    );
  }
  return context;
}
