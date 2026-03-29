"use client";

import { notFound } from "next/navigation";
import { useActionState, useMemo } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { UpdateTaskStatusContext } from "../UpdateTaskStatusContext";
import { updateTaskStatus } from "@/lib/actions/task/updateTaskStatus";
import { ActionState, UpdateTaskStatusPayload } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

const initialState: ActionState = {
  status: null,
};

interface UpdateTaskStatusProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskStatusProvider({
  children,
}: UpdateTaskStatusProviderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, payload: UpdateTaskStatusPayload) => {
      const newState = await updateTaskStatus(payload);

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
  if (state.status === "error" && state.errorCode === "notFound") {
    if (pathname === "/tasks") {
      throw new Error(state.message, { cause: "taskNotFound" });
    }

    notFound();
  }

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
    <UpdateTaskStatusContext.Provider value={contextValue}>
      {children}
    </UpdateTaskStatusContext.Provider>
  );
}
