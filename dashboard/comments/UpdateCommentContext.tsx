"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateCommentContext = createContext<ActionContextType | null>(
  null,
);

export function useUpdateComment() {
  const context = useContext(UpdateCommentContext);
  if (!context) {
    throw new Error(
      "useUpdateComment must be used within a UpdateCommentContext.Provider",
    );
  }
  return context;
}
