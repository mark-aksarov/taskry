"use client";

import { useRouter } from "@/i18n/navigation";
import { UpdateSubtaskContext } from "../UpdateSubtaskContext";
import { updateSubtask } from "@/lib/actions/subtask/updateSubtask";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface UpdateSubtaskProviderProps {
  children: React.ReactNode;
}

export function UpdateSubtaskProvider({
  children,
}: UpdateSubtaskProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateSubtask, {
    // Re-render task/[id] on success or error to keep UI in sync
    // (e.g. show not found if deleted by another user)
    onSettled: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "updateSubtask");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(contextValue.state, "updateSubtask");

  return (
    <UpdateSubtaskContext.Provider value={contextValue}>
      {children}
    </UpdateSubtaskContext.Provider>
  );
}
