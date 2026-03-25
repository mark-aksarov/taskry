"use client";

import { useContext, createContext } from "react";
import { UpdateProjectStatusesContextType } from "@/lib/types";

export const UpdateProjectStatusesContext =
  createContext<UpdateProjectStatusesContextType | null>(null);

export function useUpdateProjectStatuses() {
  const context = useContext(UpdateProjectStatusesContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectStatuses must be used within a UpdateProjectStatusesProvider",
    );
  }
  return context;
}
