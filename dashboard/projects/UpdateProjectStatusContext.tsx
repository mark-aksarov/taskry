"use client";

import {
  ActionContextType,
  UpdateProjectStatusPayload,
} from "@/lib/actions/types";
import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { updateProjectStatus } from "@/lib/actions/project/updateProjectStatus";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

const UpdateProjectStatusContext =
  createContext<ActionContextType<UpdateProjectStatusPayload> | null>(null);

interface UpdateProjectStatusProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectStatusProvider({
  children,
}: UpdateProjectStatusProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateProjectStatus, {
    onSuccess: () => router.refresh(),
  });
  const { state } = contextValue;

  useShowToastOnActionError(state);

  return (
    <UpdateProjectStatusContext.Provider value={contextValue}>
      {children}
    </UpdateProjectStatusContext.Provider>
  );
}

export function useUpdateProjectStatus() {
  const context = useContext(UpdateProjectStatusContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectStatus must be used within a UpdateProjectStatusContext.Provider",
    );
  }
  return context;
}
