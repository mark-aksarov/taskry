"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { DeleteTasksContext } from "../DeleteTasksContext";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

interface DeleteTasksProviderProps {
  children: React.ReactNode;
}

export function DeleteTasksProvider({ children }: DeleteTasksProviderProps) {
  // store IDs to track tasks being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const router = useRouter();
  const { action, state, isPending } = useActionStateWithCallbacks(
    deleteTasks,
    {
      onSuccess: () => router.refresh(),
      onError: () => setIds([]),
    },
  );

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
