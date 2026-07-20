"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { UpdateTaskStatusesContext } from "../UpdateTaskStatusesContext";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

interface UpdateTaskStatusesProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskStatusesProvider({
  children,
}: UpdateTaskStatusesProviderProps) {
  const [ids, setIds] = useState<number[]>([]);

  const router = useRouter();
  const { action, state, isPending } = useActionStateWithCallbacks(
    updateTaskStatuses,
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
    <UpdateTaskStatusesContext.Provider value={contextValue}>
      {children}
    </UpdateTaskStatusesContext.Provider>
  );
}
