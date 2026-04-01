"use client";

import { notFound } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { UpdateTaskStatusContext } from "../UpdateTaskStatusContext";
import { updateTaskStatus } from "@/lib/actions/task/updateTaskStatus";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

interface UpdateTaskStatusProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskStatusProvider({
  children,
}: UpdateTaskStatusProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTaskStatus, {
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

  useShowToastOnActionError(state);

  return (
    <UpdateTaskStatusContext.Provider value={contextValue}>
      {children}
    </UpdateTaskStatusContext.Provider>
  );
}
