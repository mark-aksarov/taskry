"use client";

import { ToggleSubtaskContext } from "../ToggleSubtaskContext";
import { toggleSubtask } from "@/lib/actions/subtask/toggleSubtask";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

interface ToggleSubtaskAltProviderProps {
  children: React.ReactNode;
}

export function ToggleSubtaskAltProvider({
  children,
}: ToggleSubtaskAltProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(toggleSubtask);
  useShowToastOnActionError(contextValue.state);

  return (
    <ToggleSubtaskContext.Provider value={contextValue}>
      {children}
    </ToggleSubtaskContext.Provider>
  );
}
