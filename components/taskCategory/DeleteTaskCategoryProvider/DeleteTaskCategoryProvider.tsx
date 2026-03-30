"use client";

import { DeleteTaskCategoryContext } from "../DeleteTaskCategoryContext";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { deleteTaskCategory } from "@/lib/actions/taskCategory/deleteTaskCategory";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

interface DeleteTaskCategoryProviderProps {
  children: React.ReactNode;
}

export function DeleteTaskCategoryProvider({
  children,
}: DeleteTaskCategoryProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(deleteTaskCategory);
  useShowToastOnActionError(contextValue.state);

  return (
    <DeleteTaskCategoryContext.Provider value={contextValue}>
      {children}
    </DeleteTaskCategoryContext.Provider>
  );
}
