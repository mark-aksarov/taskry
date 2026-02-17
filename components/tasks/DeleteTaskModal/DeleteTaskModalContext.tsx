"use client";

import {
  DeleteModalContextType,
  DeleteModalProviderProps,
  useDeleteModalContextState,
} from "@/components/common/BaseDeleteModal";

import { createContext, useContext } from "react";
import { DeleteTaskModal } from "./DeleteTaskModal";

const DeleteTaskModalContext =
  createContext<DeleteModalContextType<number> | null>(null);

export function DeleteTaskModalProvider({
  deleteEntity,
  children,
}: DeleteModalProviderProps<number[]>) {
  const contextValue = useDeleteModalContextState<number>();
  const { state, setState } = contextValue;

  return (
    <DeleteTaskModalContext.Provider value={contextValue}>
      {children}

      <DeleteTaskModal
        taskId={state.entityId || 0}
        taskTitle={state.entityName}
        isOpen={state.isOpen}
        onOpenChange={(isOpen) => setState((prev) => ({ ...prev, isOpen }))}
        deleteTask={deleteEntity}
      />
    </DeleteTaskModalContext.Provider>
  );
}

export function useDeleteTaskModal() {
  const context = useContext(DeleteTaskModalContext);

  if (!context) {
    throw new Error(
      "useDeleteTaskModal must be used within a DeleteTaskModalProvider",
    );
  }

  return context;
}
