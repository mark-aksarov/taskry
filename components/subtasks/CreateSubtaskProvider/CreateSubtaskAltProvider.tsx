"use client";

import { useRouter } from "@/i18n/navigation";
import { CreateSubtaskContext } from "../CreateSubtaskContext";
import { createSubtask } from "@/lib/actions/subtask/createSubtask";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface CreateSubtaskAltProviderProps {
  children: React.ReactNode;
}

export function CreateSubtaskAltProvider({
  children,
}: CreateSubtaskAltProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createSubtask, {
    // Always refresh the task/[id] page after creating a subtask
    // This ensures the UI stays in sync even if an error occurs
    // (e.g., the task was deleted by another user during subtask creation)
    onSettled: () => router.refresh(),
  });
  useCloseModalOnActionSuccess(contextValue.state, "createSubtask");
  useShowToastWhenModalClosedOnActionError(contextValue.state, "createSubtask");

  return (
    <CreateSubtaskContext.Provider value={contextValue}>
      {children}
    </CreateSubtaskContext.Provider>
  );
}
