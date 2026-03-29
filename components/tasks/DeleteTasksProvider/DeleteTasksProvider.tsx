"use client";

import { useRouter } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { useMemo, useState, useActionState } from "react";
import { DeleteTasksContext } from "../DeleteTasksContext";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

const initialState: ActionState = {
  status: null,
};

interface DeleteTasksProviderProps {
  children: React.ReactNode;
}

export function DeleteTasksProvider({ children }: DeleteTasksProviderProps) {
  const router = useRouter();

  // store IDs to track tasks being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, ids: number[]) => {
      const newState = await deleteTasks(ids);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to update task list
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  // wait for transition to finish
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
