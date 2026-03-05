"use client";

import {
  DeleteEntityContextType,
  useDeleteEntityContextValue,
} from "@/lib/hooks/useDeleteEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionError } from "@/lib/hooks/useToastOnActionError";
import { useRefreshPositions } from "@/lib/hooks/useRefreshPositions";

const DeletePositionContext =
  createContext<DeleteEntityContextType<number> | null>(null);

interface DeletePositionProviderProps {
  deletePosition: ActionFn<ActionState, number>;
  children: React.ReactNode;
}

export function DeletePositionProvider({
  deletePosition,
  children,
}: DeletePositionProviderProps) {
  const refreshPositions = useRefreshPositions();

  // Refresh inside reducerAction after successful deletion
  const contextValue = useDeleteEntityContextValue(
    deletePosition,
    refreshPositions,
  );

  const { state } = contextValue;
  useToastOnActionError(state);

  // Can't call this hook here — provider unmounts after successful deletion
  // useRefreshPositionsOnActionSuccess(state);

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
