"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateProject } from "@/lib/actions/project/updateProject";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export const UpdateProjectDeadlineContext =
  createContext<ActionContextType | null>(null);

interface UpdateProjectDeadlineProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectDeadlineProvider({
  children,
}: UpdateProjectDeadlineProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateProject, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateProjectDeadline");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateProjectDeadline");

  return (
    <UpdateProjectDeadlineContext.Provider value={contextValue}>
      {children}
    </UpdateProjectDeadlineContext.Provider>
  );
}

export function useUpdateProjectDeadline() {
  const context = useContext(UpdateProjectDeadlineContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectDeadline must be used within a UpdateProjectDeadlineContext.Provider",
    );
  }
  return context;
}
