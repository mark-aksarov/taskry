"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const SendCommentContext = createContext<ActionContextType | null>(null);

export function useSendComment() {
  const context = useContext(SendCommentContext);
  if (!context) {
    throw new Error(
      "useSendComment must be used within a SendCommentContext.Provider",
    );
  }
  return context;
}
