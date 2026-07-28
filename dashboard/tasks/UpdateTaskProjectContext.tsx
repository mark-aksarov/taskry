"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateTask } from "@/lib/actions/task/updateTask";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export const UpdateTaskProjectContext = createContext<ActionContextType | null>(
  null,
);

interface UpdateTaskProjectProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskProjectProvider({
  children,
}: UpdateTaskProjectProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTask, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateTaskProject");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateTaskProject");

  return (
    <UpdateTaskProjectContext.Provider value={contextValue}>
      {children}
    </UpdateTaskProjectContext.Provider>
  );
}

export function useUpdateTaskProject() {
  const context = useContext(UpdateTaskProjectContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskProject must be used within a UpdateTaskProjectContext.Provider",
    );
  }
  return context;
}
