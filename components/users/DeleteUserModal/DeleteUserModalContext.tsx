"use client";

import {
  DeleteModalContextType,
  DeleteModalProviderProps,
  useDeleteModalContextState,
} from "@/components/common/BaseDeleteModal";

import { createContext, useContext } from "react";
import { DeleteUserModal } from "./DeleteUserModal";

const DeleteUserModalContext =
  createContext<DeleteModalContextType<string> | null>(null);

export function DeleteUserModalProvider({
  deleteEntity,
  children,
}: DeleteModalProviderProps<string>) {
  const contextValue = useDeleteModalContextState<string>();
  const { state, setState } = contextValue;

  return (
    <DeleteUserModalContext.Provider value={contextValue}>
      {children}

      <DeleteUserModal
        userId={state.entityId || ""}
        userFullName={state.entityName}
        isOpen={state.isOpen}
        onOpenChange={(isOpen) => setState((prev) => ({ ...prev, isOpen }))}
        deleteUser={deleteEntity}
      />
    </DeleteUserModalContext.Provider>
  );
}

export function useDeleteUserModal() {
  const context = useContext(DeleteUserModalContext);

  if (!context) {
    throw new Error(
      "useDeleteUserModal must be used within a DeleteUserModalProvider",
    );
  }

  return context;
}
