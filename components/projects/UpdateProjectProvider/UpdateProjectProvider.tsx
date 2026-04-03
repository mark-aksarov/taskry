"use client";

import { useRouter } from "@/i18n/navigation";
import { UpdateProjectContext } from "../UpdateProjectContext";
import { updateProject } from "@/lib/actions/project/updateProject";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

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

  useCloseModalThenShowToastOnActionSuccess(state, "updateProject");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateProject");
  useShowToastWhenModalClosedOnActionError(state, "updateProject");

  return (
    <UpdateProjectContext.Provider value={contextValue}>
      {children}
    </UpdateProjectContext.Provider>
  );
}
