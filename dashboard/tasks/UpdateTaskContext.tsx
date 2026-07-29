"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateTask } from "@/lib/actions/task/updateTask";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const UpdateTaskContext = createContext<ActionContextType | null>(null);

interface UpdateTaskProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskProvider({ children }: UpdateTaskProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTask, {
    onSuccess: () => router.refresh(),
  });
  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateTask");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateTask");

  return (
    <UpdateTaskContext.Provider value={contextValue}>
      {children}
    </UpdateTaskContext.Provider>
  );
}

export function useUpdateTask() {
  const context = useContext(UpdateTaskContext);
  if (!context) {
    throw new Error(
      "useUpdateTask must be used within a UpdateTaskContext.Provider",
    );
  }
  return context;
}
