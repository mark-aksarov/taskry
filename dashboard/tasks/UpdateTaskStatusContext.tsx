"use client";

import {
  ActionContextType,
  UpdateProjectStatusPayload,
} from "@/lib/actions/types";
import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { updateTaskStatus } from "@/lib/actions/task/updateTaskStatus";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

const UpdateTaskStatusContext =
  createContext<ActionContextType<UpdateProjectStatusPayload> | null>(null);

interface UpdateTaskStatusProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskStatusProvider({
  children,
}: UpdateTaskStatusProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTaskStatus, {
    onSuccess: () => router.refresh(),
  });
  const { state } = contextValue;

  useShowToastOnActionError(state);

  return (
    <UpdateTaskStatusContext.Provider value={contextValue}>
      {children}
    </UpdateTaskStatusContext.Provider>
  );
}

export function useUpdateTaskStatus() {
  const context = useContext(UpdateTaskStatusContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskStatus must be used within a UpdateTaskStatusContext.Provider",
    );
  }
  return context;
}
