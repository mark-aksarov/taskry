"use client";

import { useRouter } from "@/i18n/navigation";
import { ToggleSubtaskContext } from "../ToggleSubtaskContext";
import { toggleSubtask } from "@/lib/actions/subtask/toggleSubtask";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

interface ToggleSubtaskProviderProps {
  children: React.ReactNode;
}

export function ToggleSubtaskProvider({
  children,
}: ToggleSubtaskProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(toggleSubtask, {
    // Re-render task/[id] on success or error to keep UI in sync
    // (e.g. show not found if deleted by another user)
    onSettled: () => router.refresh(),
  });
  useShowToastOnActionError(contextValue.state);

  return (
    <ToggleSubtaskContext.Provider value={contextValue}>
      {children}
    </ToggleSubtaskContext.Provider>
  );
}
