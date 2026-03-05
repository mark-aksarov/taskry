"use client";

import {
  DeleteEntitiesContextType,
  useDeleteEntitiesContextValue,
} from "@/lib/hooks/useDeleteEntitiesContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionError } from "@/lib/hooks/useToastOnActionError";
import { useRefreshPositionsOnActionSuccess } from "@/lib/hooks/useRefreshPositionsOnActionSuccess";

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
  useToastOnActionError(state);
  useRefreshPositionsOnActionSuccess(state);

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
