"use client";

import { useRouter } from "@/i18n/navigation";
import { updateProject } from "@/lib/actions/project/updateProject";
import { UpdateProjectDeadlineContext } from "../UpdateProjectDeadlineContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateProjectDeadlineProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectDeadlineProvider({
  children,
}: UpdateProjectDeadlineProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateProject, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateProjectDeadline");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateProjectDeadline");
  useShowToastWhenModalClosedOnActionError(state, "updateProjectDeadline");

  return (
    <UpdateProjectDeadlineContext.Provider value={contextValue}>
      {children}
    </UpdateProjectDeadlineContext.Provider>
  );
}
