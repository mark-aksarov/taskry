"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const CreateCompanyContext = createContext<ActionContextType | null>(
  null,
);

export function useCreateCompany() {
  const context = useContext(CreateCompanyContext);
  if (!context)
    throw new Error(
      "useCreateCompany must be used within CreateCompanyProvider",
    );
  return context;
}
