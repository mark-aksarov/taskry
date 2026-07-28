"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateTask } from "@/lib/actions/task/updateTask";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export const UpdateTaskCategoryRelContext =
  createContext<ActionContextType | null>(null);

interface UpdateTaskCategoryRelProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskCategoryRelProvider({
  children,
}: UpdateTaskCategoryRelProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTask, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateTaskCategoryRel");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateTaskCategoryRel");

  return (
    <UpdateTaskCategoryRelContext.Provider value={contextValue}>
      {children}
    </UpdateTaskCategoryRelContext.Provider>
  );
}

export function useUpdateTaskCategoryRel() {
  const context = useContext(UpdateTaskCategoryRelContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskCategoryRel must be used within a UpdateTaskCategoryRelContext.Provider",
    );
  }
  return context;
}
