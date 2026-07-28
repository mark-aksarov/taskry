"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateTask } from "@/lib/actions/task/updateTask";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export const UpdateTaskDescriptionContext =
  createContext<ActionContextType | null>(null);

interface UpdateTaskDescriptionProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskDescriptionProvider({
  children,
}: UpdateTaskDescriptionProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTask, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateTaskDescription");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateTaskDescription");

  return (
    <UpdateTaskDescriptionContext.Provider value={contextValue}>
      {children}
    </UpdateTaskDescriptionContext.Provider>
  );
}

export function useUpdateTaskDescription() {
  const context = useContext(UpdateTaskDescriptionContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskDescription must be used within a UpdateTaskDescriptionContext.Provider",
    );
  }
  return context;
}
