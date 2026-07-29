"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { DeleteEntitiesContextType } from "@/lib/types";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

const DeleteTasksContext = createContext<DeleteEntitiesContextType | null>(
  null,
);

interface DeleteTasksProviderProps {
  children: React.ReactNode;
}

export function DeleteTasksProvider({ children }: DeleteTasksProviderProps) {
  // store IDs to track tasks being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const router = useRouter();
  const { action, state, isPending } = useActionStateWithCallbacks(
    deleteTasks,
    {
      onSuccess: () => router.refresh(),
      onError: () => setIds([]),
    },
  );

  useShowToastOnActionError(state);

  const contextValue = useMemo(
    () => ({ state, action, isPending, ids, setIds }),
    [state, action, isPending, ids],
  );

  return (
    <DeleteTasksContext.Provider value={contextValue}>
      {children}
    </DeleteTasksContext.Provider>
  );
}

export function useDeleteTasks() {
  const context = useContext(DeleteTasksContext);
  if (!context)
    throw new Error(
      "useDeleteTasks must be used within a DeleteTasksContext.Provider",
    );
  return context;
}
