"use client";

import {
  DeleteModalContextType,
  DeleteModalProviderProps,
  useDeleteModalContextState,
} from "@/components/common/BaseDeleteModal";

import { createContext, useContext } from "react";
import { DeleteProjectModal } from "./DeleteProjectModal";

const DeleteProjectModalContext =
  createContext<DeleteModalContextType<number> | null>(null);

export function DeleteProjectModalProvider({
  deleteEntity,
  children,
}: DeleteModalProviderProps<number[]>) {
  const contextValue = useDeleteModalContextState<number>();

  const { state, setState } = contextValue;

  return (
    <DeleteProjectModalContext.Provider value={contextValue}>
      {children}

      <DeleteProjectModal
        projectId={state.entityId || 0}
        projectTitle={state.entityName}
        isOpen={state.isOpen}
        onOpenChange={(isOpen) => setState((prev) => ({ ...prev, isOpen }))}
        deleteProjects={deleteEntity}
      />
    </DeleteProjectModalContext.Provider>
  );
}

export function useDeleteProjectModal() {
  const context = useContext(DeleteProjectModalContext);

  if (!context) {
    throw new Error(
      "useDeleteProjectModal must be used within a DeleteProjectModalProvider",
    );
  }

  return context;
}
