"use client";

import {
  DeleteModalContextType,
  DeleteModalProviderProps,
  useDeleteModalContextState,
} from "@/components/common/BaseDeleteModal";

import { createContext, useContext } from "react";
import { DeleteCommentModal } from "./DeleteCommentModal";

const DeleteCommentModalContext =
  createContext<DeleteModalContextType<number> | null>(null);

interface DeleteCommentModalProviderProps
  extends DeleteModalProviderProps<number> {
  mutate: () => void;
}

export function DeleteCommentModalProvider({
  deleteEntity,
  children,
  mutate,
}: DeleteCommentModalProviderProps) {
  const contextValue = useDeleteModalContextState<number>();
  const { state, setState } = contextValue;

  return (
    <DeleteCommentModalContext.Provider value={contextValue}>
      {children}

      <DeleteCommentModal
        commentId={state.entityId || 0}
        isOpen={state.isOpen}
        onOpenChange={(isOpen) => setState((prev) => ({ ...prev, isOpen }))}
        deleteComment={deleteEntity}
        mutate={mutate}
      />
    </DeleteCommentModalContext.Provider>
  );
}

export function useDeleteCommentModal() {
  const context = useContext(DeleteCommentModalContext);

  if (!context) {
    throw new Error(
      "useDeleteCommentModal must be used within a DeleteCommentModalProvider",
    );
  }

  return context;
}
