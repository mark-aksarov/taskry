"use client";

import {
  DeleteEntityContextType,
  useDeleteEntityContextValue,
} from "@/lib/hooks/useDeleteEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

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

  // wait for transition to finish
  useShowToastOnActionError(state);

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
