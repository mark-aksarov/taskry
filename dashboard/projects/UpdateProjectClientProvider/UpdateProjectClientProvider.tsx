"use client";

import { useRouter } from "@/i18n/navigation";
import { updateProject } from "@/lib/actions/project/updateProject";
import { UpdateProjectClientContext } from "../UpdateProjectClientContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

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
