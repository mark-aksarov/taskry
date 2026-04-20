"use client";

import { useRouter } from "@/i18n/navigation";
import { DeleteTaskCategoryContext } from "../DeleteTaskCategoryContext";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { deleteTaskCategory } from "@/lib/actions/taskCategory/deleteTaskCategory";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

interface DeleteTaskCategoryProviderProps {
  children: React.ReactNode;
}

export function DeleteTaskCategoryProvider({
  children,
}: DeleteTaskCategoryProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(deleteTaskCategory, {
    onSuccess: () => router.refresh(),
  });
  useShowToastOnActionError(contextValue.state);

  return (
    <DeleteTaskCategoryContext.Provider value={contextValue}>
      {children}
    </DeleteTaskCategoryContext.Provider>
  );
}
