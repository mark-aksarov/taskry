"use client";

import {
  DeleteEntityContextType,
  useDeleteEntityContextValue,
} from "@/lib/hooks/useDeleteEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionError } from "@/lib/hooks/useToastOnActionError";

const DeleteCompanyContext =
  createContext<DeleteEntityContextType<number> | null>(null);

interface DeleteCompanyProviderProps {
  deleteCompany: ActionFn<ActionState, number>;
  children: React.ReactNode;
}

export function DeleteCompanyProvider({
  deleteCompany,
  children,
}: DeleteCompanyProviderProps) {
  const contextValue = useDeleteEntityContextValue(deleteCompany);

  const { state } = contextValue;
  useToastOnActionError(state);

  return (
    <DeleteCompanyContext.Provider value={contextValue}>
      {children}
    </DeleteCompanyContext.Provider>
  );
}

export function useDeleteCompany() {
  const context = useContext(DeleteCompanyContext);
  if (!context)
    throw new Error(
      "useDeleteCompany must be used within DeleteCompanyProvider",
    );
  return context;
}
