"use client";

import { useRouter } from "@/i18n/navigation";
import { ImportProjectsContext } from "../ImportProjectsContext";
import { importProjects } from "@/lib/actions/project/importProjects";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface ImportProjectsProviderProps {
  children: React.ReactNode;
}

export function ImportProjectsProvider({
  children,
}: ImportProjectsProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(importProjects, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "importProjects");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(
    contextValue.state,
    "importProjects",
  );

  return (
    <ImportProjectsContext.Provider value={contextValue}>
      {children}
    </ImportProjectsContext.Provider>
  );
}
