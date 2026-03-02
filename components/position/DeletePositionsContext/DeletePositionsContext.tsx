"use client";

import {
  useDeleteEntitiesState,
  DeleteEntitiesContextType,
} from "@/lib/hooks/useDeleteEntitiesState";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const DeletePositionsContext = createContext<DeleteEntitiesContextType<
  number[]
> | null>(null);

export function DeletePositionsProvider({
  deletePositions,
  children,
}: {
  deletePositions: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}) {
  const contextValue = useDeleteEntitiesState(deletePositions);
  return (
    <DeletePositionsContext.Provider value={contextValue}>
      {children}
    </DeletePositionsContext.Provider>
  );
}

export function useDeletePositions() {
  const context = useContext(DeletePositionsContext);
  if (!context)
    throw new Error(
      "useDeletePositions must be used within a DeletePositionsProvider",
    );
  return context;
}
