"use client";

import { DeleteSubtaskContext } from "../DeleteSubtaskContext";
import { deleteSubtask } from "@/lib/actions/subtask/deleteSubtask";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

interface DeleteSubtaskAltProviderProps {
  children: React.ReactNode;
}

export function DeleteSubtaskAltProvider({
  children,
}: DeleteSubtaskAltProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(deleteSubtask);
  useShowToastOnActionError(contextValue.state);

  return (
    <DeleteSubtaskContext.Provider value={contextValue}>
      {children}
    </DeleteSubtaskContext.Provider>
  );
}
