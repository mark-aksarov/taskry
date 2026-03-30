"use client";

import { useMemo, useState } from "react";
import { UpdateProjectStatusesContext } from "../UpdateProjectStatusesContext";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { updateProjectStatuses } from "@/lib/actions/project/updateProjectStatuses";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

interface UpdateProjectStatusesProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectStatusesProvider({
  children,
}: UpdateProjectStatusesProviderProps) {
  const [ids, setIds] = useState<number[]>([]);

  const { action, state, isPending } = useActionStateWithRouteRefresh(
    updateProjectStatuses,
  );

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
    <UpdateProjectStatusesContext.Provider value={contextValue}>
      {children}
    </UpdateProjectStatusesContext.Provider>
  );
}
