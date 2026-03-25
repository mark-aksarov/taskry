"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const CreatePositionContext = createContext<ActionContextType | null>(
  null,
);

export function useCreatePosition() {
  const context = useContext(CreatePositionContext);
  if (!context)
    throw new Error(
      "useCreatePosition must be used within CreatePositionContext.Provider",
    );
  return context;
}
