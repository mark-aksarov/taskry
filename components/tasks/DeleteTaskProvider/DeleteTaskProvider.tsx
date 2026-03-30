"use client";

import { DeleteTaskContext } from "../DeleteTaskContext";
import { deleteTask } from "@/lib/actions/task/deleteTask";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

interface DeleteTaskProviderProps {
  children: React.ReactNode;
}

export function DeleteTaskProvider({ children }: DeleteTaskProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(deleteTask);
  useShowToastOnActionError(contextValue.state);

  return (
    <DeleteTaskContext.Provider value={contextValue}>
      {children}
    </DeleteTaskContext.Provider>
  );
}
