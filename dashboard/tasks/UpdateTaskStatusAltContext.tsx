"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateTask } from "@/lib/actions/task/updateTask";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export const UpdateTaskStatusAltContext =
  createContext<ActionContextType | null>(null);

interface UpdateTaskStatusAltProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskStatusAltProvider({
  children,
}: UpdateTaskStatusAltProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTask, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateTaskStatus");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateTaskStatus");

  return (
    <UpdateTaskStatusAltContext.Provider value={contextValue}>
      {children}
    </UpdateTaskStatusAltContext.Provider>
  );
}

export function useUpdateTaskStatusAlt() {
  const context = useContext(UpdateTaskStatusAltContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskStatusAlt must be used within a UpdateTaskStatusAltContext.Provider",
    );
  }
  return context;
}
