"use client";

import {
  DeleteEntitiesContextType,
  useDeleteEntitiesContextValue,
} from "@/lib/hooks/useDeleteEntitiesContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

const DeleteProjectsContext = createContext<DeleteEntitiesContextType | null>(
  null,
);

interface DeleteProjectsProviderProps {
  deleteProjects: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}

export function DeleteProjectsProvider({
  deleteProjects,
  children,
}: DeleteProjectsProviderProps) {
  const contextValue = useDeleteEntitiesContextValue(deleteProjects);

  const { state } = contextValue;

  // wait for transition to finish
  useShowToastOnActionError(state);

  return (
    <DeleteProjectsContext.Provider value={contextValue}>
      {children}
    </DeleteProjectsContext.Provider>
  );
}

export function useDeleteProjects() {
  const context = useContext(DeleteProjectsContext);
  if (!context)
    throw new Error(
      "useDeleteProjects must be used within a DeleteProjectsProvider",
    );
  return context;
}
