"use client";

import { useRouter } from "@/i18n/navigation";
import { CreateTaskContext } from "../CreateTaskContext";
import { createTask } from "@/lib/actions/task/createTask";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface CreateTaskProviderProps {
  children: React.ReactNode;
}

export function CreateTaskProvider({ children }: CreateTaskProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createTask, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalThenShowToastOnActionSuccess(contextValue.state, "createTask");
  useShowToastWhenModalClosedOnActionSuccess(contextValue.state, "createTask");
  useShowToastWhenModalClosedOnActionError(contextValue.state, "createTask");

  return (
    <CreateTaskContext.Provider value={contextValue}>
      {children}
    </CreateTaskContext.Provider>
  );
}
