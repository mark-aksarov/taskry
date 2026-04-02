"use client";

import { useRouter } from "@/i18n/navigation";
import { DeleteSubtaskContext } from "../DeleteSubtaskContext";
import { deleteSubtask } from "@/lib/actions/subtask/deleteSubtask";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

interface DeleteSubtaskAltProviderProps {
  children: React.ReactNode;
}

export function DeleteSubtaskAltProvider({
  children,
}: DeleteSubtaskAltProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(deleteSubtask, {
    // Re-render task/[id] on success or error to keep UI in sync
    onSettled: () => router.refresh(),
  });
  useShowToastOnActionError(contextValue.state);

  return (
    <DeleteSubtaskContext.Provider value={contextValue}>
      {children}
    </DeleteSubtaskContext.Provider>
  );
}
