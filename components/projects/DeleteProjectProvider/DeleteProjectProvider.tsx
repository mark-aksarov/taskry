"use client";

import { DeleteProjectContext } from "../DeleteProjectContext";
import { deleteProject } from "@/lib/actions/project/deleteProject";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

interface DeleteProjectProviderProps {
  children: React.ReactNode;
}

export function DeleteProjectProvider({
  children,
}: DeleteProjectProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(deleteProject);
  useShowToastOnActionError(contextValue.state);

  return (
    <DeleteProjectContext.Provider value={contextValue}>
      {children}
    </DeleteProjectContext.Provider>
  );
}
