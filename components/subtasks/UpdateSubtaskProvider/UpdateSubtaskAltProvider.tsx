"use client";

import { useRouter } from "@/i18n/navigation";
import { UpdateSubtaskContext } from "../UpdateSubtaskContext";
import { updateSubtask } from "@/lib/actions/subtask/updateSubtask";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface UpdateSubtaskAltProviderProps {
  children: React.ReactNode;
}

export function UpdateSubtaskAltProvider({
  children,
}: UpdateSubtaskAltProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateSubtask, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "updateSubtask");
  useShowToastWhenModalClosedOnActionError(contextValue.state, "updateSubtask");

  return (
    <UpdateSubtaskContext.Provider value={contextValue}>
      {children}
    </UpdateSubtaskContext.Provider>
  );
}
