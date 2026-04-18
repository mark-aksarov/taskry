"use client";

import { useRouter } from "@/i18n/navigation";
import { CreateProjectContext } from "../CreateProjectContext";
import { createProject } from "@/lib/actions/project/createProject";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

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

  useCloseModalOnActionSuccess(contextValue.state, "createProject");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(contextValue.state, "createProject");

  return (
    <CreateProjectContext.Provider value={contextValue}>
      {children}
    </CreateProjectContext.Provider>
  );
}
