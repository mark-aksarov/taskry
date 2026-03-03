"use client";

import {
  useDeleteEntitiesState,
  DeleteEntitiesContextType,
} from "@/lib/hooks/useDeleteEntitiesState";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
} from "@/lib/actions/types";

import { useContext, createContext } from "react";

const DeleteProjectsContext =
  createContext<DeleteEntitiesContextType<DeleteProjectsPayload> | null>(null);

export function DeleteProjectsProvider({
  deleteProjects,
  children,
}: {
  deleteProjects: ActionFn<ActionState, DeleteProjectsPayload>;
  children: React.ReactNode;
}) {
  const contextValue = useDeleteEntitiesState(deleteProjects);
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
