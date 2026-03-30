"use client";

import {
  ActionContextType,
  UpdateProjectStatusPayload,
} from "@/lib/actions/types";
import { useContext, createContext } from "react";

export const UpdateTaskStatusContext =
  createContext<ActionContextType<UpdateProjectStatusPayload> | null>(null);

export function useUpdateTaskStatus() {
  const context = useContext(UpdateTaskStatusContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskStatus must be used within a UpdateTaskStatusContext.Provider",
    );
  }
  return context;
}
