"use client";

import { CreateProjectCategoryContext } from "../CreateProjectCategoryContext";
import { createProjectCategory } from "@/lib/actions/projectCategory/createProjectCategory";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface CreateProjectCategoryProviderProps {
  children: React.ReactNode;
}

export function CreateProjectCategoryProvider({
  children,
}: CreateProjectCategoryProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(createProjectCategory);

  useCloseModalThenShowToastOnActionSuccess(
    contextValue.state,
    "createProjectCategory",
  );
  useShowToastWhenModalClosedOnActionSuccess(
    contextValue.state,
    "createProjectCategory",
  );
  useShowToastWhenModalClosedOnActionError(
    contextValue.state,
    "createProjectCategory",
  );

  return (
    <CreateProjectCategoryContext.Provider value={contextValue}>
      {children}
    </CreateProjectCategoryContext.Provider>
  );
}
