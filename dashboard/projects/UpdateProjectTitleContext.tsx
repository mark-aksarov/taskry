"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateProject } from "@/lib/actions/project/updateProject";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export const UpdateProjectTitleContext =
  createContext<ActionContextType | null>(null);

interface UpdateProjectTitleProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectTitleProvider({
  children,
}: UpdateProjectTitleProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateProject, {
    onSuccess: () => router.refresh(),
  });
  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateProjectTitle");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateProjectTitle");

  return (
    <UpdateProjectTitleContext.Provider value={contextValue}>
      {children}
    </UpdateProjectTitleContext.Provider>
  );
}

export function useUpdateProjectTitle() {
  const context = useContext(UpdateProjectTitleContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectTitle must be used within a UpdateProjectTitleContext.Provider",
    );
  }
  return context;
}
