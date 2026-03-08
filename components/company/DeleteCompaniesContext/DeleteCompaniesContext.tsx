"use client";

import {
  DeleteEntitiesContextType,
  useDeleteEntitiesContextValue,
} from "@/lib/hooks/useDeleteEntitiesContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

const DeleteCompaniesContext = createContext<DeleteEntitiesContextType | null>(
  null,
);

interface DeleteCompaniesProviderProps {
  deleteCompanies: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}

export function DeleteCompaniesProvider({
  deleteCompanies,
  children,
}: DeleteCompaniesProviderProps) {
  const contextValue = useDeleteEntitiesContextValue(deleteCompanies);

  const { state } = contextValue;

  // wait for transition to finish
  useShowToastOnActionError(state);

  return (
    <DeleteCompaniesContext.Provider value={contextValue}>
      {children}
    </DeleteCompaniesContext.Provider>
  );
}

export function useDeleteCompanies() {
  const context = useContext(DeleteCompaniesContext);
  if (!context)
    throw new Error(
      "useDeleteCompanies must be used within a DeleteCompaniesProvider",
    );
  return context;
}
