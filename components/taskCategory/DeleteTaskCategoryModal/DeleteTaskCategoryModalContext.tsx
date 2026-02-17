"use client";

import {
  DeleteModalContextType,
  DeleteModalProviderProps,
  useDeleteModalContextState,
} from "@/components/common/BaseDeleteModal";

import { createContext, useContext } from "react";
import { DeleteTaskCategoryModal } from "./DeleteTaskCategoryModal";

const DeleteTaskCategoryModalContext =
  createContext<DeleteModalContextType<number> | null>(null);

export function DeleteTaskCategoryModalProvider({
  deleteEntity,
  children,
}: DeleteModalProviderProps<number[]>) {
  const contextValue = useDeleteModalContextState<number>();

  const { state, setState } = contextValue;

  return (
    <DeleteTaskCategoryModalContext.Provider value={contextValue}>
      {children}

      <DeleteTaskCategoryModal
        taskCategoryId={state.entityId || 0}
        taskCategoryName={state.entityName}
        isOpen={state.isOpen}
        onOpenChange={(isOpen) => setState((prev) => ({ ...prev, isOpen }))}
        deleteTaskCategories={deleteEntity}
      />
    </DeleteTaskCategoryModalContext.Provider>
  );
}

export function useDeleteTaskCategoryModal() {
  const context = useContext(DeleteTaskCategoryModalContext);

  if (!context) {
    throw new Error(
      "useDeleteTaskCategoryModal must be used within a DeleteTaskCategoryModalProvider",
    );
  }

  return context;
}
