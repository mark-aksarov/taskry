"use client";

import { useRouter } from "@/i18n/navigation";
import { UpdateTaskCategoryContext } from "../UpdateTaskCategoryContext";
import { updateTaskCategory } from "@/lib/actions/taskCategory/updateTaskCategory";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

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

  useCloseModalThenShowToastOnActionSuccess(state, "updateTaskCategory");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateTaskCategory");
  useShowToastWhenModalClosedOnActionError(state, "updateTaskCategory");

  return (
    <UpdateTaskCategoryContext.Provider value={contextValue}>
      {children}
    </UpdateTaskCategoryContext.Provider>
  );
}
