"use client";

import { useContext, createContext } from "react";
import { UpdatePersonImageContextType } from "@/lib/hooks/useUpdatePersonImageContextValue";

export const UpdateUserImageContext =
  createContext<UpdatePersonImageContextType<string> | null>(null);

export function useUpdateUserImage() {
  const context = useContext(UpdateUserImageContext);
  if (!context) {
    throw new Error(
      "useUpdateUserImage must be used within a UpdateUserImageContext.Provider",
    );
  }
  return context;
}
