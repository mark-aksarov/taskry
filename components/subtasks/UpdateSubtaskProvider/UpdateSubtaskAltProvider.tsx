"use client";

import { UpdateSubtaskContext } from "../UpdateSubtaskContext";
import { updateSubtask } from "@/lib/actions/subtask/updateSubtask";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface UpdateSubtaskAltProviderProps {
  children: React.ReactNode;
}

export function UpdateSubtaskAltProvider({
  children,
}: UpdateSubtaskAltProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(updateSubtask);
  useCloseModalOnActionSuccess(contextValue.state, "updateSubtask");
  useShowToastWhenModalClosedOnActionError(contextValue.state, "updateSubtask");

  return (
    <UpdateSubtaskContext.Provider value={contextValue}>
      {children}
    </UpdateSubtaskContext.Provider>
  );
}
