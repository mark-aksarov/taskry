"use client";

import { useMemo, useState } from "react";
import { DeleteProjectsContext } from "../DeleteProjectsContext";
import { deleteProjects } from "@/lib/actions/project/deleteProjects";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

interface DeleteProjectsProviderProps {
  children: React.ReactNode;
}

export function DeleteProjectsProvider({
  children,
}: DeleteProjectsProviderProps) {
  // store IDs to track projects being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const { action, state, isPending } =
    useActionStateWithRouteRefresh(deleteProjects);
  useShowToastOnActionError(state);

  const contextValue = useMemo(
    () => ({ state, action, isPending, ids, setIds }),
    [state, action, isPending, ids],
  );

  return (
    <DeleteProjectsContext.Provider value={contextValue}>
      {children}
    </DeleteProjectsContext.Provider>
  );
}
