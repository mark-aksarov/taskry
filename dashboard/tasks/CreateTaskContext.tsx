"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { createTask } from "@/lib/actions/task/createTask";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export const CreateTaskContext = createContext<ActionContextType | null>(null);

interface CreateTaskProviderProps {
  children: React.ReactNode;
}

export function CreateTaskProvider({ children }: CreateTaskProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createTask, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "createTask");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(contextValue.state, "createTask");

  return (
    <CreateTaskContext.Provider value={contextValue}>
      {children}
    </CreateTaskContext.Provider>
  );
}

export function useCreateTask() {
  const context = useContext(CreateTaskContext);
  if (!context)
    throw new Error(
      "useCreateTask must be used within CreateTaskContext.Provider",
    );
  return context;
}
