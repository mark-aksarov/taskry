"use client";

import { useRouter } from "@/i18n/navigation";
import { updateProject } from "@/lib/actions/project/updateProject";
import { UpdateProjectStatusAltContext } from "../UpdateProjectStatusAltContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

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

  useCloseModalThenShowToastOnActionSuccess(state, "updateProjectStatus");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateProjectStatus");
  useShowToastWhenModalClosedOnActionError(state, "updateProjectStatus");

  return (
    <UpdateProjectStatusAltContext.Provider value={contextValue}>
      {children}
    </UpdateProjectStatusAltContext.Provider>
  );
}
