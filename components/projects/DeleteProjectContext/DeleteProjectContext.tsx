"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectPayload,
} from "@/lib/actions/types";

import {
  DeleteEntityContextType,
  useDeleteEntityContextValue,
} from "@/lib/hooks/useDeleteEntityContextValue";

import { useContext, createContext } from "react";
import { useToastOnActionError } from "@/lib/hooks/useToastOnActionError";

const DeleteProjectContext =
  createContext<DeleteEntityContextType<DeleteProjectPayload> | null>(null);

interface DeleteProjectProviderProps {
  deleteProject: ActionFn<ActionState, DeleteProjectPayload>;
  children: React.ReactNode;
}

export function DeleteProjectProvider({
  deleteProject,
  children,
}: DeleteProjectProviderProps) {
  const contextValue = useDeleteEntityContextValue(deleteProject);

  const { state } = contextValue;
  useToastOnActionError(state);

  return (
    <DeleteProjectContext.Provider value={contextValue}>
      {children}
    </DeleteProjectContext.Provider>
  );
}

export function useDeleteProject() {
  const context = useContext(DeleteProjectContext);
  if (!context)
    throw new Error(
      "useDeleteProject must be used within DeleteProjectProvider",
    );
  return context;
}
