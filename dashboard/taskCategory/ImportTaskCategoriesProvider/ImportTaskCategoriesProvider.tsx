"use client";

import { useRouter } from "@/i18n/navigation";
import { ImportTaskCategoriesContext } from "../ImportTaskCategoriesContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { importTaskCategories } from "@/lib/actions/taskCategory/importTaskCategories";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface ImportTaskCategoriesProviderProps {
  children: React.ReactNode;
}

export function ImportTaskCategoriesProvider({
  children,
}: ImportTaskCategoriesProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(importTaskCategories, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "importTaskCategories");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(
    contextValue.state,
    "importTaskCategories",
  );

  return (
    <ImportTaskCategoriesContext.Provider value={contextValue}>
      {children}
    </ImportTaskCategoriesContext.Provider>
  );
}
