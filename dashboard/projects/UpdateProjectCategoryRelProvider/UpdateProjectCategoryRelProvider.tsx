"use client";

import { useRouter } from "@/i18n/navigation";
import { updateProject } from "@/lib/actions/project/updateProject";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { UpdateProjectCategoryRelContext } from "../UpdateProjectCategoryRelContext";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface UpdateProjectCategoryRelProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectCategoryRelProvider({
  children,
}: UpdateProjectCategoryRelProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateProject, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateProjectCategoryRel");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateProjectCategoryRel");

  return (
    <UpdateProjectCategoryRelContext.Provider value={contextValue}>
      {children}
    </UpdateProjectCategoryRelContext.Provider>
  );
}
