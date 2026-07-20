"use client";

import { useRouter } from "@/i18n/navigation";
import { ImportTasksContext } from "../ImportTasksContext";
import { importTasks } from "@/lib/actions/task/importTasks";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface ImportTasksProviderProps {
  children: React.ReactNode;
}

export function ImportTasksProvider({ children }: ImportTasksProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(importTasks, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "importTasks");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(contextValue.state, "importTasks");

  return (
    <ImportTasksContext.Provider value={contextValue}>
      {children}
    </ImportTasksContext.Provider>
  );
}
