"use client";

import { useRouter } from "@/i18n/navigation";
import { ExportTasksContext } from "../ExportTasksContext";
import { importTasks } from "@/lib/actions/task/importTasks";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";

interface ExportTasksProviderProps {
  children: React.ReactNode;
}

export function ExportTasksProvider({ children }: ExportTasksProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(importTasks, {
    onSuccess: () => router.refresh(),
  });

  useShowToastOnActionSuccess(contextValue.state);
  useShowToastOnActionError(contextValue.state);

  return (
    <ExportTasksContext.Provider value={contextValue}>
      {children}
    </ExportTasksContext.Provider>
  );
}
