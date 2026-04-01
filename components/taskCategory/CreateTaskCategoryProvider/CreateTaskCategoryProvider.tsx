"use client";

import { useRouter } from "@/i18n/navigation";
import { CreateTaskCategoryContext } from "../CreateTaskCategoryContext";
import { createTaskCategory } from "@/lib/actions/taskCategory/createTaskCategory";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface CreateTaskCategoryProviderProps {
  children: React.ReactNode;
}

export function CreateTaskCategoryProvider({
  children,
}: CreateTaskCategoryProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createTaskCategory, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalThenShowToastOnActionSuccess(
    contextValue.state,
    "createTaskCategory",
  );
  useShowToastWhenModalClosedOnActionSuccess(
    contextValue.state,
    "createTaskCategory",
  );
  useShowToastWhenModalClosedOnActionError(
    contextValue.state,
    "createTaskCategory",
  );

  return (
    <CreateTaskCategoryContext.Provider value={contextValue}>
      {children}
    </CreateTaskCategoryContext.Provider>
  );
}
