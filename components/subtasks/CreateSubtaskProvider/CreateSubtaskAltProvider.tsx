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
    onSuccess: () => router.refresh(),
  });
  useCloseModalOnActionSuccess(contextValue.state, "createSubtask");
  useShowToastWhenModalClosedOnActionError(contextValue.state, "createSubtask");

  return (
    <CreateSubtaskContext.Provider value={contextValue}>
      {children}
    </CreateSubtaskContext.Provider>
  );
}
