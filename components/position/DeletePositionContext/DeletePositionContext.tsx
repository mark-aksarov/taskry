"use client";

import {
  useDeleteEntityState,
  DeleteEntityContextType,
} from "@/lib/hooks/useDeleteEntityState";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const DeletePositionContext = createContext<DeleteEntityContextType<
  number[]
> | null>(null);

export function DeletePositionProvider({
  deletePosition,
  children,
}: {
  deletePosition: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}) {
  const contextValue = useDeleteEntityState(deletePosition);

  return (
    <DeletePositionContext.Provider value={contextValue}>
      {children}
    </DeletePositionContext.Provider>
  );
}

export function useDeletePosition() {
  const context = useContext(DeletePositionContext);
  if (!context)
    throw new Error(
      "useDeletePosition must be used within DeletePositionProvider",
    );
  return context;
}
