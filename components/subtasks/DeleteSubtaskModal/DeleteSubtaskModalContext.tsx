"use client";

import {
  DeleteModalContextType,
  DeleteModalProviderProps,
  useDeleteModalContextState,
} from "@/components/common/BaseDeleteModal";

import { createContext, useContext } from "react";
import { DeleteSubtaskModal } from "./DeleteSubtaskModal";

const DeleteSubtaskModalContext =
  createContext<DeleteModalContextType<number> | null>(null);

interface DeleteSubtaskModalProviderProps
  extends DeleteModalProviderProps<number> {
  mutate?: () => void;
}

export function DeleteSubtaskModalProvider({
  deleteEntity,
  mutate,
  children,
}: DeleteSubtaskModalProviderProps) {
  const contextValue = useDeleteModalContextState<number>();

  const { state, setState } = contextValue;

  return (
    <DeleteSubtaskModalContext.Provider value={contextValue}>
      {children}

      <DeleteSubtaskModal
        subtaskId={state.entityId || 0}
        subtaskText={state.entityName}
        isOpen={state.isOpen}
        onOpenChange={(isOpen) => setState((prev) => ({ ...prev, isOpen }))}
        deleteSubtask={deleteEntity}
        mutate={mutate}
      />
    </DeleteSubtaskModalContext.Provider>
  );
}

export function useDeleteSubtaskModal() {
  const context = useContext(DeleteSubtaskModalContext);

  if (!context) {
    throw new Error(
      "useDeleteSubtaskModal must be used within a DeleteSubtaskModalProvider",
    );
  }

  return context;
}
