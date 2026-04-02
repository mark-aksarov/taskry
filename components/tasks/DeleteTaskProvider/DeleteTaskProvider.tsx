"use client";

import { useRouter } from "@/i18n/navigation";
import { DeleteTaskContext } from "../DeleteTaskContext";
import { deleteTask } from "@/lib/actions/task/deleteTask";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

interface DeleteTaskProviderProps {
  children: React.ReactNode;
}

export function DeleteTaskProvider({ children }: DeleteTaskProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(deleteTask, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useShowToastOnActionError(state);

  return (
    <DeleteTaskContext.Provider value={contextValue}>
      {children}
    </DeleteTaskContext.Provider>
  );
}
