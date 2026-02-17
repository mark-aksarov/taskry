"use client";

import {
  DeleteModalContextType,
  DeleteModalProviderProps,
  useDeleteModalContextState,
} from "@/components/common/BaseDeleteModal";

import { createContext, useContext } from "react";
import { DeleteCompanyModal } from "./DeleteCompanyModal";

const DeleteCompanyModalContext =
  createContext<DeleteModalContextType<number> | null>(null);

export function DeleteCompanyModalProvider({
  deleteEntity,
  children,
}: DeleteModalProviderProps<number[]>) {
  const contextValue = useDeleteModalContextState<number>();

  const { state, setState } = contextValue;

  return (
    <DeleteCompanyModalContext.Provider value={contextValue}>
      {children}

      <DeleteCompanyModal
        companyId={state.entityId || 0}
        companyName={state.entityName}
        isOpen={state.isOpen}
        onOpenChange={(isOpen) => setState((prev) => ({ ...prev, isOpen }))}
        deleteCompanies={deleteEntity}
      />
    </DeleteCompanyModalContext.Provider>
  );
}

export function useDeleteCompanyModal() {
  const context = useContext(DeleteCompanyModalContext);

  if (!context) {
    throw new Error(
      "useDeleteCompanyModal must be used within a DeleteCompanyModalProvider",
    );
  }

  return context;
}
