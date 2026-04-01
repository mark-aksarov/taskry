"use client";

import { useRouter } from "@/i18n/navigation";
import { ToggleSubtaskContext } from "../ToggleSubtaskContext";
import { toggleSubtask } from "@/lib/actions/subtask/toggleSubtask";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

interface ToggleSubtaskAltProviderProps {
  children: React.ReactNode;
}

export function ToggleSubtaskAltProvider({
  children,
}: ToggleSubtaskAltProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(toggleSubtask, {
    onSuccess: () => router.refresh(),
  });
  useShowToastOnActionError(contextValue.state);

  return (
    <ToggleSubtaskContext.Provider value={contextValue}>
      {children}
    </ToggleSubtaskContext.Provider>
  );
}
