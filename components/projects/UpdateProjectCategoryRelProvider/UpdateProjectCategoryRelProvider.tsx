"use client";

import { useRouter } from "@/i18n/navigation";
import { updateProject } from "@/lib/actions/project/updateProject";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { UpdateProjectCategoryRelContext } from "../UpdateProjectCategoryRelContext";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

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

  useCloseModalThenShowToastOnActionSuccess(state, "updateProjectCategoryRel");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateProjectCategoryRel");
  useShowToastWhenModalClosedOnActionError(state, "updateProjectCategoryRel");

  return (
    <UpdateProjectCategoryRelContext.Provider value={contextValue}>
      {children}
    </UpdateProjectCategoryRelContext.Provider>
  );
}
