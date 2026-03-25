"use client";

import { useContext, createContext } from "react";
import { UpdateEntityStatusContextType } from "@/lib/hooks/useUpdateEntityStatusContextValue";

export const UpdateProjectStatusContext =
  createContext<UpdateEntityStatusContextType | null>(null);

export function useUpdateProjectStatus() {
  const context = useContext(UpdateProjectStatusContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectStatus must be used within a UpdateProjectStatusContext.Provider",
    );
  }
  return context;
}
