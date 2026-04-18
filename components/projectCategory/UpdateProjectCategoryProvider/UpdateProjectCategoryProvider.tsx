"use client";

import { useRouter } from "@/i18n/navigation";
import { UpdateProjectCategoryContext } from "../UpdateProjectCategoryContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { updateProjectCategory } from "@/lib/actions/projectCategory/updateProjectCategory";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface UpdateProjectCategoryProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectCategoryProvider({
  children,
}: UpdateProjectCategoryProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateProjectCategory, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateProjectCategory");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateProjectCategory");

  return (
    <UpdateProjectCategoryContext.Provider value={contextValue}>
      {children}
    </UpdateProjectCategoryContext.Provider>
  );
}
