"use client";

import { useRouter } from "@/i18n/navigation";
import { CreateProjectContext } from "../CreateProjectContext";
import { createProject } from "@/lib/actions/project/createProject";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface CreateProjectProviderProps {
  children: React.ReactNode;
}

export function CreateProjectProvider({
  children,
}: CreateProjectProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createProject, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalThenShowToastOnActionSuccess(
    contextValue.state,
    "createProject",
  );
  useShowToastWhenModalClosedOnActionSuccess(
    contextValue.state,
    "createProject",
  );
  useShowToastWhenModalClosedOnActionError(contextValue.state, "createProject");

  return (
    <CreateProjectContext.Provider value={contextValue}>
      {children}
    </CreateProjectContext.Provider>
  );
}
