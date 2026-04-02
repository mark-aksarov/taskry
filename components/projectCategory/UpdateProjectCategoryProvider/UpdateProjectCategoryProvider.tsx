"use client";

import { useRouter } from "@/i18n/navigation";
import { UpdateProjectCategoryContext } from "../UpdateProjectCategoryContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { updateProjectCategory } from "@/lib/actions/projectCategory/updateProjectCategory";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

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

  useCloseModalThenShowToastOnActionSuccess(state, "updateProjectCategory");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateProjectCategory");
  useShowToastWhenModalClosedOnActionError(state, "updateProjectCategory");

  return (
    <UpdateProjectCategoryContext.Provider value={contextValue}>
      {children}
    </UpdateProjectCategoryContext.Provider>
  );
}
