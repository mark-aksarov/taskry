"use client";

import {
  ActionContextType,
  UpdateProjectStatusPayload,
} from "@/lib/actions/types";
import { useContext, createContext } from "react";

export const UpdateProjectStatusContext =
  createContext<ActionContextType<UpdateProjectStatusPayload> | null>(null);

export function useUpdateProjectStatus() {
  const context = useContext(UpdateProjectStatusContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectStatus must be used within a UpdateProjectStatusContext.Provider",
    );
  }
  return context;
}
