"use client";

import { useRouter } from "@/i18n/navigation";
import { CreateSubtaskContext } from "../CreateSubtaskContext";
import { createSubtask } from "@/lib/actions/subtask/createSubtask";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface CreateSubtaskProviderProps {
  children: React.ReactNode;
}

export function CreateSubtaskProvider({
  children,
}: CreateSubtaskProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createSubtask, {
    // Re-render task/[id] on success or error to keep UI in sync
    // (e.g. show not found if deleted by another user)
    onSettled: () => router.refresh(),
  });
  useCloseModalOnActionSuccess(contextValue.state, "createSubtask");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(contextValue.state, "createSubtask");

  return (
    <CreateSubtaskContext.Provider value={contextValue}>
      {children}
    </CreateSubtaskContext.Provider>
  );
}
