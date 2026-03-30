"use client";

import { CreateProjectContext } from "../CreateProjectContext";
import { createProject } from "@/lib/actions/project/createProject";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface CreateProjectProviderProps {
  children: React.ReactNode;
}

export function CreateProjectProvider({
  children,
}: CreateProjectProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(createProject);

  useCloseModalThenShowToastOnActionSuccess(
    contextValue.state,
    "createProject",
  );
  useShowToastWhenModalClosedOnActionSuccess(
    contextValue.state,
    "createProject",
  );
  useShowToastWhenModalClosedOnActionError(contextValue.state, "createProject");

  return (
    <CreateProjectContext.Provider value={contextValue}>
      {children}
    </CreateProjectContext.Provider>
  );
}
