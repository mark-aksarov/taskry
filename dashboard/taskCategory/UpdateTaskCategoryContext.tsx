"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateTaskCategory } from "@/lib/actions/taskCategory/updateTaskCategory";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const UpdateTaskCategoryContext = createContext<ActionContextType | null>(null);

interface UpdateTaskCategoryProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskCategoryProvider({
  children,
}: UpdateTaskCategoryProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTaskCategory, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateTaskCategory");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateTaskCategory");

  return (
    <UpdateTaskCategoryContext.Provider value={contextValue}>
      {children}
    </UpdateTaskCategoryContext.Provider>
  );
}

export function useUpdateTaskCategory() {
  const context = useContext(UpdateTaskCategoryContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskCategory must be used within a UpdateTaskCategoryContext.Provider",
    );
  }
  return context;
}
