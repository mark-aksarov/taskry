"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { UpdateTaskStatusesContextType } from "@/lib/types";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

const UpdateTaskStatusesContext =
  createContext<UpdateTaskStatusesContextType | null>(null);

interface UpdateTaskStatusesProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskStatusesProvider({
  children,
}: UpdateTaskStatusesProviderProps) {
  const [ids, setIds] = useState<number[]>([]);

  const router = useRouter();
  const { action, state, isPending } = useActionStateWithCallbacks(
    updateTaskStatuses,
    {
      onSuccess: () => router.refresh(),
      onError: () => setIds([]),
    },
  );

  useShowToastOnActionError(state);

  const contextValue = useMemo(
    () => ({
      state,
      action,
      isPending,
      ids,
      setIds,
    }),
    [state, action, isPending, ids],
  );

  return (
    <UpdateTaskStatusesContext.Provider value={contextValue}>
      {children}
    </UpdateTaskStatusesContext.Provider>
  );
}

export function useUpdateTaskStatuses() {
  const context = useContext(UpdateTaskStatusesContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskStatuses must be used within a UpdateTaskStatusesContext.Provider",
    );
  }
  return context;
}
