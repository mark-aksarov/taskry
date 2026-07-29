"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateTask } from "@/lib/actions/task/updateTask";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const UpdateTaskAssigneeContext = createContext<ActionContextType | null>(null);

interface UpdateTaskAssigneeProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskAssigneeProvider({
  children,
}: UpdateTaskAssigneeProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTask, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateTaskAssignee");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateTaskAssignee");

  return (
    <UpdateTaskAssigneeContext.Provider value={contextValue}>
      {children}
    </UpdateTaskAssigneeContext.Provider>
  );
}

export function useUpdateTaskAssignee() {
  const context = useContext(UpdateTaskAssigneeContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskAssignee must be used within a UpdateTaskAssigneeContext.Provider",
    );
  }
  return context;
}
