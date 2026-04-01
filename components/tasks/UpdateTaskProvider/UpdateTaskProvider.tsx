"use client";

import { notFound } from "next/navigation";
import { UpdateTaskContext } from "../UpdateTaskContext";
import { usePathname, useRouter } from "@/i18n/navigation";
import { updateTask } from "@/lib/actions/task/updateTask";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateTaskProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskProvider({ children }: UpdateTaskProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTask, {
    onSuccess: () => router.refresh(),
  });
  const { state } = contextValue;

  // if the task was not found (e.g. deleted by another user)
  // from the tasks page, show error.tsx
  // from the task detail page, show not-found.tsx
  if (state.status === "error" && state.errorCode === "notFound") {
    if (pathname === "/tasks") {
      throw new Error(state.message, { cause: "taskNotFound" });
    }

    notFound();
  }

  useCloseModalThenShowToastOnActionSuccess(state, "updateTask");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateTask");
  useShowToastWhenModalClosedOnActionError(state, "updateTask");

  return (
    <UpdateTaskContext.Provider value={contextValue}>
      {children}
    </UpdateTaskContext.Provider>
  );
}
