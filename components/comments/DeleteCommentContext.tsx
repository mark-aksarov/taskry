"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const DeleteCommentContext =
  createContext<ActionContextType<number> | null>(null);

export function useDeleteComment() {
  const context = useContext(DeleteCommentContext);
  if (!context)
    throw new Error(
      "useDeleteComment must be used within DeleteCommentProvider",
    );
  return context;
}
