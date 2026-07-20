"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { UpdateProjectStatusesContext } from "../UpdateProjectStatusesContext";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { updateProjectStatuses } from "@/lib/actions/project/updateProjectStatuses";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

interface UpdateProjectStatusesProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectStatusesProvider({
  children,
}: UpdateProjectStatusesProviderProps) {
  const [ids, setIds] = useState<number[]>([]);

  const router = useRouter();
  const { action, state, isPending } = useActionStateWithCallbacks(
    updateProjectStatuses,
    {
      onSuccess: () => router.refresh(),
      onError: () => setIds([]),
    },
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
