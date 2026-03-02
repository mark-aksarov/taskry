"use client";

import {
  useDeleteEntitiesState,
  DeleteEntitiesContextType,
} from "@/lib/hooks/useDeleteEntitiesState";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const DeleteCompaniesContext = createContext<DeleteEntitiesContextType<
  number[]
> | null>(null);

export function DeleteCompaniesProvider({
  deleteCompanies,
  children,
}: {
  deleteCompanies: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}) {
  const contextValue = useDeleteEntitiesState(deleteCompanies);
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
