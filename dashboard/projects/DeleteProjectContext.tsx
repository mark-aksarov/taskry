"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { deleteProject } from "@/lib/actions/project/deleteProject";
import { ActionContextType, DeleteProjectPayload } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

export const DeleteProjectContext =
  createContext<ActionContextType<DeleteProjectPayload> | null>(null);

interface DeleteProjectProviderProps {
  children: React.ReactNode;
}

export function DeleteProjectProvider({
  children,
}: DeleteProjectProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(deleteProject, {
    onSuccess: () => router.refresh(),
  });
  useShowToastOnActionError(contextValue.state);

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
      "useDeleteProject must be used within DeleteProjectContext.Provider",
    );
  return context;
}
