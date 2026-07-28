"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateTask } from "@/lib/actions/task/updateTask";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export const UpdateTaskTitleContext = createContext<ActionContextType | null>(
  null,
);

interface UpdateTaskTitleProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskTitleProvider({
  children,
}: UpdateTaskTitleProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTask, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateTaskTitle");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateTaskTitle");

  return (
    <UpdateTaskTitleContext.Provider value={contextValue}>
      {children}
    </UpdateTaskTitleContext.Provider>
  );
}

export function useUpdateTaskTitle() {
  const context = useContext(UpdateTaskTitleContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskTitle must be used within a UpdateTaskTitleContext.Provider",
    );
  }
  return context;
}
