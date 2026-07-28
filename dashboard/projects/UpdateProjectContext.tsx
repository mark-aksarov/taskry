"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateProject } from "@/lib/actions/project/updateProject";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export const UpdateProjectContext = createContext<ActionContextType | null>(
  null,
);

interface UpdateProjectProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectProvider({
  children,
}: UpdateProjectProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateProject, {
    onSuccess: () => router.refresh(),
  });
  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateProject");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateProject");

  return (
    <UpdateProjectContext.Provider value={contextValue}>
      {children}
    </UpdateProjectContext.Provider>
  );
}

export function useUpdateProject() {
  const context = useContext(UpdateProjectContext);
  if (!context) {
    throw new Error(
      "useUpdateProject must be used within a UpdateProjectContext.Provider",
    );
  }
  return context;
}
