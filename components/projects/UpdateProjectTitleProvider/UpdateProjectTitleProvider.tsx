"use client";

import { useRouter } from "@/i18n/navigation";
import { updateProject } from "@/lib/actions/project/updateProject";
import { UpdateProjectTitleContext } from "../UpdateProjectTitleContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

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

  useCloseModalThenShowToastOnActionSuccess(state, "updateProjectTitle");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateProjectTitle");
  useShowToastWhenModalClosedOnActionError(state, "updateProjectTitle");

  return (
    <UpdateProjectTitleContext.Provider value={contextValue}>
      {children}
    </UpdateProjectTitleContext.Provider>
  );
}
