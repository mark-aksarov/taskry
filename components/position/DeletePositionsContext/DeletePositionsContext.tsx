"use client";

import {
  DeleteEntitiesContextType,
  useDeleteEntitiesContextValue,
} from "@/lib/hooks/useDeleteEntitiesContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

const DeletePositionsContext = createContext<DeleteEntitiesContextType | null>(
  null,
);

interface DeletePositionsProviderProps {
  deletePositions: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}

export function DeletePositionsProvider({
  deletePositions,
  children,
}: DeletePositionsProviderProps) {
  const contextValue = useDeleteEntitiesContextValue(deletePositions);

  const { state } = contextValue;

  // wait for transition to finish
  useShowToastOnActionError(state);

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
