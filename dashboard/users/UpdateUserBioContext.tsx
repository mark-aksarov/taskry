"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateUserBioContext = createContext<ActionContextType | null>(
  null,
);

export function useUpdateUserBio() {
  const context = useContext(UpdateUserBioContext);
  if (!context) {
    throw new Error(
      "useUpdateUserBio must be used within a UpdateUserBioContext.Provider",
    );
  }
  return context;
}
