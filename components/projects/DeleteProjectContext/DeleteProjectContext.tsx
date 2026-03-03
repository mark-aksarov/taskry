"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
} from "@/lib/actions/types";

import {
  useDeleteEntityState,
  DeleteEntityContextType,
} from "@/lib/hooks/useDeleteEntityState";

import { useContext, createContext } from "react";

const DeleteProjectContext =
  createContext<DeleteEntityContextType<DeleteProjectsPayload> | null>(null);

export function DeleteProjectProvider({
  deleteProject,
  children,
}: {
  deleteProject: ActionFn<ActionState, DeleteProjectsPayload>;
  children: React.ReactNode;
}) {
  const contextValue = useDeleteEntityState(deleteProject);

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
