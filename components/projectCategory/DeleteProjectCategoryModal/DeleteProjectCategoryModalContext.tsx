"use client";

import {
  DeleteModalContextType,
  DeleteModalProviderProps,
  useDeleteModalContextState,
} from "@/components/common/BaseDeleteModal";

import { createContext, useContext } from "react";
import { DeleteProjectCategoryModal } from "./DeleteProjectCategoryModal";

const DeleteProjectCategoryModalContext =
  createContext<DeleteModalContextType<number> | null>(null);

export function DeleteProjectCategoryModalProvider({
  deleteEntity,
  children,
}: DeleteModalProviderProps<number[]>) {
  const contextValue = useDeleteModalContextState<number>();

  const { state, setState } = contextValue;

  return (
    <DeleteProjectCategoryModalContext.Provider value={contextValue}>
      {children}

      <DeleteProjectCategoryModal
        projectCategoryId={state.entityId || 0}
        projectCategoryName={state.entityName}
        isOpen={state.isOpen}
        onOpenChange={(isOpen) => setState((prev) => ({ ...prev, isOpen }))}
        deleteProjectCategories={deleteEntity}
      />
    </DeleteProjectCategoryModalContext.Provider>
  );
}

export function useDeleteProjectCategoryModal() {
  const context = useContext(DeleteProjectCategoryModalContext);

  if (!context) {
    throw new Error(
      "useDeleteProjectCategoryModal must be used within a DeleteProjectCategoryModalProvider",
    );
  }

  return context;
}
