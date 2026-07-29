"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateTask } from "@/lib/actions/task/updateTask";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const UpdateTaskDeadlineContext = createContext<ActionContextType | null>(null);

interface UpdateTaskDeadlineProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskDeadlineProvider({
  children,
}: UpdateTaskDeadlineProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTask, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateTaskDeadline");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateTaskDeadline");

  return (
    <UpdateTaskDeadlineContext.Provider value={contextValue}>
      {children}
    </UpdateTaskDeadlineContext.Provider>
  );
}

export function useUpdateTaskDeadline() {
  const context = useContext(UpdateTaskDeadlineContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskDeadline must be used within a UpdateTaskDeadlineContext.Provider",
    );
  }
  return context;
}
