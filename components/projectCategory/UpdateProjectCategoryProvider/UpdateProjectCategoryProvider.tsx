"use client";

import { UpdateProjectCategoryContext } from "../UpdateProjectCategoryContext";
import { updateProjectCategory } from "@/lib/actions/projectCategory/updateProjectCategory";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateProjectCategoryProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectCategoryProvider({
  children,
}: UpdateProjectCategoryProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(updateProjectCategory);

  const { state } = contextValue;

  // if the project category was not found (e.g. deleted by another user)
  if (state.status === "error" && state.errorCode === "notFound") {
    throw new Error(state.message, { cause: "projectCategoryNotFound" });
  }

  useCloseModalThenShowToastOnActionSuccess(state, "updateProjectCategory");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateProjectCategory");
  useShowToastWhenModalClosedOnActionError(state, "updateProjectCategory");

  return (
    <UpdateProjectCategoryContext.Provider value={contextValue}>
      {children}
    </UpdateProjectCategoryContext.Provider>
  );
}
