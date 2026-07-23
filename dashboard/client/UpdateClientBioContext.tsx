"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateClientBioContext = createContext<ActionContextType | null>(
  null,
);

export function useUpdateClientBio() {
  const context = useContext(UpdateClientBioContext);
  if (!context) {
    throw new Error(
      "useUpdateClientBio must be used within a UpdateClientBioContext.Provider",
    );
  }
  return context;
}
