"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { deleteSubtask } from "@/lib/actions/subtask/deleteSubtask";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

const DeleteSubtaskContext = createContext<ActionContextType<number> | null>(
  null,
);

interface DeleteSubtaskProviderProps {
  children: React.ReactNode;
}

export function DeleteSubtaskProvider({
  children,
}: DeleteSubtaskProviderProps) {
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

export function useDeleteSubtask() {
  const context = useContext(DeleteSubtaskContext);
  if (!context)
    throw new Error(
      "useDeleteSubtask must be used within DeleteSubtaskContext.Provider",
    );
  return context;
}
