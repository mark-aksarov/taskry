"use client";

import {
  useDeleteEntityState,
  DeleteEntityContextType,
} from "@/lib/hooks/useDeleteEntityState";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const DeleteCompanyContext = createContext<DeleteEntityContextType<
  number[]
> | null>(null);

export function DeleteCompanyProvider({
  deleteCompany,
  children,
}: {
  deleteCompany: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}) {
  const contextValue = useDeleteEntityState(deleteCompany);

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
