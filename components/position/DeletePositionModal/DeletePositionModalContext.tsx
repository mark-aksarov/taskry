"use client";

import {
  DeleteModalContextType,
  DeleteModalProviderProps,
  useDeleteModalContextState,
} from "@/components/common/BaseDeleteModal";

import { createContext, useContext } from "react";
import { DeletePositionModal } from "./DeletePositionModal";

const DeletePositionModalContext =
  createContext<DeleteModalContextType<number> | null>(null);

export function DeletePositionModalProvider({
  deleteEntity,
  children,
}: DeleteModalProviderProps<number[]>) {
  const contextValue = useDeleteModalContextState<number>();
  const { state, setState } = contextValue;

  return (
    <DeletePositionModalContext.Provider value={contextValue}>
      {children}

      <DeletePositionModal
        positionId={state.entityId || 0}
        positionName={state.entityName}
        isOpen={state.isOpen}
        onOpenChange={(isOpen) => setState((prev) => ({ ...prev, isOpen }))}
        deletePositions={deleteEntity}
      />
    </DeletePositionModalContext.Provider>
  );
}

export function useDeletePositionModal() {
  const context = useContext(DeletePositionModalContext);

  if (!context) {
    throw new Error(
      "useDeletePositionModal must be used within a DeletePositionModalProvider",
    );
  }

  return context;
}
