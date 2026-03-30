"use client";

import { useMemo, useState } from "react";
import { DeleteTasksContext } from "../DeleteTasksContext";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

interface DeleteTasksProviderProps {
  children: React.ReactNode;
}

export function DeleteTasksProvider({ children }: DeleteTasksProviderProps) {
  // store IDs to track tasks being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const { action, state, isPending } =
    useActionStateWithRouteRefresh(deleteTasks);
  useShowToastOnActionError(state);

  const contextValue = useMemo(
    () => ({ state, action, isPending, ids, setIds }),
    [state, action, isPending, ids],
  );

  return (
    <DeleteTasksContext.Provider value={contextValue}>
      {children}
    </DeleteTasksContext.Provider>
  );
}
