"use client";

import { useRouter } from "@/i18n/navigation";
import { CreateTaskContext } from "../CreateTaskContext";
import { createTask } from "@/lib/actions/task/createTask";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface CreateTaskProviderProps {
  children: React.ReactNode;
}

export function CreateTaskProvider({ children }: CreateTaskProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createTask, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "createTask");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(contextValue.state, "createTask");

  return (
    <CreateTaskContext.Provider value={contextValue}>
      {children}
    </CreateTaskContext.Provider>
  );
}
