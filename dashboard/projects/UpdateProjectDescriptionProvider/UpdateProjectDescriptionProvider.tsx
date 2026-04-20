"use client";

import { useRouter } from "@/i18n/navigation";
import { updateProject } from "@/lib/actions/project/updateProject";
import { UpdateProjectDescriptionContext } from "../UpdateProjectDescriptionContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface UpdateProjectDescriptionProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectDescriptionProvider({
  children,
}: UpdateProjectDescriptionProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateProject, {
    onSuccess: () => router.refresh(),
  });
  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateProjectDescription");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateProjectDescription");

  return (
    <UpdateProjectDescriptionContext.Provider value={contextValue}>
      {children}
    </UpdateProjectDescriptionContext.Provider>
  );
}
