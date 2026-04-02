"use client";

import { useRouter } from "@/i18n/navigation";
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
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTaskStatus, {
    onSuccess: () => router.refresh(),
  });
  const { state } = contextValue;

  useShowToastOnActionError(state);

  return (
    <UpdateTaskStatusContext.Provider value={contextValue}>
      {children}
    </UpdateTaskStatusContext.Provider>
  );
}
