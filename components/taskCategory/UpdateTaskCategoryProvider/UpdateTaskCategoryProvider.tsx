"use client";

import { UpdateTaskCategoryContext } from "../UpdateTaskCategoryContext";
import { updateTaskCategory } from "@/lib/actions/taskCategory/updateTaskCategory";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateTaskCategoryProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskCategoryProvider({
  children,
}: UpdateTaskCategoryProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(updateTaskCategory);

  const { state } = contextValue;

  // if the task category was not found (e.g. deleted by another user)
  if (state.status === "error" && state.errorCode === "notFound") {
    throw new Error(state.message, { cause: "taskCategoryNotFound" });
  }

  useCloseModalThenShowToastOnActionSuccess(state, "updateTaskCategory");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateTaskCategory");
  useShowToastWhenModalClosedOnActionError(state, "updateTaskCategory");

  return (
    <UpdateTaskCategoryContext.Provider value={contextValue}>
      {children}
    </UpdateTaskCategoryContext.Provider>
  );
}
