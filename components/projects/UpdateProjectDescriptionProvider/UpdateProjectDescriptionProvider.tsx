"use client";

import { useRouter } from "@/i18n/navigation";
import { updateProject } from "@/lib/actions/project/updateProject";
import { UpdateProjectDescriptionContext } from "../UpdateProjectDescriptionContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

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

  useCloseModalThenShowToastOnActionSuccess(state, "updateProjectDescription");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateProjectDescription");
  useShowToastWhenModalClosedOnActionError(state, "updateProjectDescription");

  return (
    <UpdateProjectDescriptionContext.Provider value={contextValue}>
      {children}
    </UpdateProjectDescriptionContext.Provider>
  );
}
