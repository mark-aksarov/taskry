"use client";

import { CreateTaskContext } from "../CreateTaskContext";
import { createTask } from "@/lib/actions/task/createTask";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface CreateTaskProviderProps {
  children: React.ReactNode;
}

export function CreateTaskProvider({ children }: CreateTaskProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(createTask);

  useCloseModalThenShowToastOnActionSuccess(contextValue.state, "createTask");
  useShowToastWhenModalClosedOnActionSuccess(contextValue.state, "createTask");
  useShowToastWhenModalClosedOnActionError(contextValue.state, "createTask");

  return (
    <CreateTaskContext.Provider value={contextValue}>
      {children}
    </CreateTaskContext.Provider>
  );
}
