"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateProject } from "@/lib/actions/project/updateProject";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const UpdateProjectClientContext = createContext<ActionContextType | null>(
  null,
);

interface UpdateProjectClientProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectClientProvider({
  children,
}: UpdateProjectClientProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateProject, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateProjectClient");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateProjectClient");

  return (
    <UpdateProjectClientContext.Provider value={contextValue}>
      {children}
    </UpdateProjectClientContext.Provider>
  );
}

export function useUpdateProjectClient() {
  const context = useContext(UpdateProjectClientContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectClient must be used within a UpdateProjectClientContext.Provider",
    );
  }
  return context;
}
