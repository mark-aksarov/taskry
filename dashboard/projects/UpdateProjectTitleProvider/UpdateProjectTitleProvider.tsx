"use client";

import { useRouter } from "@/i18n/navigation";
import { updateProject } from "@/lib/actions/project/updateProject";
import { UpdateProjectTitleContext } from "../UpdateProjectTitleContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

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
