"use client";

import { useRouter } from "@/i18n/navigation";
import { UpdateTaskCategoryContext } from "../UpdateTaskCategoryContext";
import { updateTaskCategory } from "@/lib/actions/taskCategory/updateTaskCategory";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

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
