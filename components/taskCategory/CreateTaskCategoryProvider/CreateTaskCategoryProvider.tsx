"use client";

import { CreateTaskCategoryContext } from "../CreateTaskCategoryContext";
import { createTaskCategory } from "@/lib/actions/taskCategory/createTaskCategory";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface CreateTaskCategoryProviderProps {
  children: React.ReactNode;
}

export function CreateTaskCategoryProvider({
  children,
}: CreateTaskCategoryProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(createTaskCategory);

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
