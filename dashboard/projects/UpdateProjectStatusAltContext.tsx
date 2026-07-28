"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateProject } from "@/lib/actions/project/updateProject";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export const UpdateProjectStatusAltContext =
  createContext<ActionContextType | null>(null);

interface UpdateProjectStatusAltProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectStatusAltProvider({
  children,
}: UpdateProjectStatusAltProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateProject, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateProjectStatus");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateProjectStatus");

  return (
    <UpdateProjectStatusAltContext.Provider value={contextValue}>
      {children}
    </UpdateProjectStatusAltContext.Provider>
  );
}

export function useUpdateProjectStatusAlt() {
  const context = useContext(UpdateProjectStatusAltContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectStatusAlt must be used within a UpdateProjectStatusAltContext.Provider",
    );
  }
  return context;
}
