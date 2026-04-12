"use client";

import { useRouter } from "@/i18n/navigation";
import { updateTask } from "@/lib/actions/task/updateTask";
import { UpdateTaskCategoryRelContext } from "../UpdateTaskCategoryRelContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

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

  useCloseModalThenShowToastOnActionSuccess(state, "updateTaskCategoryRel");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateTaskCategoryRel");
  useShowToastWhenModalClosedOnActionError(state, "updateTaskCategoryRel");

  return (
    <UpdateTaskCategoryRelContext.Provider value={contextValue}>
      {children}
    </UpdateTaskCategoryRelContext.Provider>
  );
}
