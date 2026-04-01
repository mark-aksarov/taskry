"use client";

import { useRouter } from "@/i18n/navigation";
import { CreateProjectCategoryContext } from "../CreateProjectCategoryContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { createProjectCategory } from "@/lib/actions/projectCategory/createProjectCategory";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface CreateProjectCategoryProviderProps {
  children: React.ReactNode;
}

export function CreateProjectCategoryProvider({
  children,
}: CreateProjectCategoryProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createProjectCategory, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalThenShowToastOnActionSuccess(
    contextValue.state,
    "createProjectCategory",
  );
  useShowToastWhenModalClosedOnActionSuccess(
    contextValue.state,
    "createProjectCategory",
  );
  useShowToastWhenModalClosedOnActionError(
    contextValue.state,
    "createProjectCategory",
  );

  return (
    <CreateProjectCategoryContext.Provider value={contextValue}>
      {children}
    </CreateProjectCategoryContext.Provider>
  );
}
