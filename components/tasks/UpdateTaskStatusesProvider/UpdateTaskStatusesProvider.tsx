"use client";

import { useRouter } from "@/i18n/navigation";
import { useMemo, useState, useActionState } from "react";
import { UpdateTaskStatusesContext } from "../UpdateTaskStatusesContext";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { ActionState, UpdateTaskStatusesPayload } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

const initialState: ActionState = {
  status: null,
};

interface UpdateTaskStatusesProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskStatusesProvider({
  children,
}: UpdateTaskStatusesProviderProps) {
  const router = useRouter();

  const [ids, setIds] = useState<number[]>([]);

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, payload: UpdateTaskStatusesPayload) => {
      const newState = await updateTaskStatuses(payload);

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
