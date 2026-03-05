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
import { useRefreshProjects } from "@/lib/hooks/useRefreshProjects";

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
  const refreshProjects = useRefreshProjects();

  // Refresh inside reducerAction after successful deletion
  const contextValue = useDeleteEntityContextValue(
    deleteProject,
    refreshProjects,
  );

  const { state } = contextValue;
  useToastOnActionError(state);

  // Can't call this hook here — provider unmounts after successful deletion
  // useRefreshProjectsOnActionSuccess(state);

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
