"use client";

import {
  ActionState,
  ActionContextType,
  ToggleSubtaskPayload,
} from "@/lib/actions/types";
import { useContext, createContext } from "react";

export const initialState: ActionState = {
  status: null,
};

export const ToggleSubtaskContext =
  createContext<ActionContextType<ToggleSubtaskPayload> | null>(null);

export function useToggleSubtask() {
  const context = useContext(ToggleSubtaskContext);
  if (!context) {
    throw new Error(
      "useToggleSubtask must be used within a ToggleSubtaskContext.Provider",
    );
  }
  return context;
}
