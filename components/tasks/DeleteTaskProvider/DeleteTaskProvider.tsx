"use client";

import { useRouter } from "@/i18n/navigation";
import { useActionState, useMemo } from "react";
import { DeleteTaskContext } from "../DeleteTaskContext";
import { deleteTask } from "@/lib/actions/task/deleteTask";
import { ActionState, DeleteTaskPayload } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

const initialState: ActionState = {
  status: null,
};

interface DeleteTaskProviderProps {
  children: React.ReactNode;
}

export function DeleteTaskProvider({ children }: DeleteTaskProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, payload: DeleteTaskPayload) => {
      const newState = await deleteTask(payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
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
    }),
    [state, action, isPending],
  );

  return (
    <DeleteTaskContext.Provider value={contextValue}>
      {children}
    </DeleteTaskContext.Provider>
  );
}
