"use client";

import { useRouter } from "@/i18n/navigation";
import { UpdateProjectContext } from "../UpdateProjectContext";
import { updateProject } from "@/lib/actions/project/updateProject";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

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
