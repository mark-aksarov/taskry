"use client";

import { useMemo, useState } from "react";
import { UpdateTaskStatusesContext } from "../UpdateTaskStatusesContext";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

interface UpdateTaskStatusesProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskStatusesProvider({
  children,
}: UpdateTaskStatusesProviderProps) {
  const [ids, setIds] = useState<number[]>([]);

  const { action, state, isPending } =
    useActionStateWithRouteRefresh(updateTaskStatuses);

  useShowToastOnActionError(state);

  const contextValue = useMemo(
    () => ({
      state,
      action,
      isPending,
      ids,
      setIds,
    }),
    [state, action, isPending, ids],
  );

  return (
    <UpdateTaskStatusesContext.Provider value={contextValue}>
      {children}
    </UpdateTaskStatusesContext.Provider>
  );
}
