"use client";

import { useRouter } from "@/i18n/navigation";
import { ImportProjectCategoriesContext } from "../ImportProjectCategoriesContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { importProjectCategories } from "@/lib/actions/projectCategory/importProjectCategories";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface ImportProjectCategoriesProviderProps {
  children: React.ReactNode;
}

export function ImportProjectCategoriesProvider({
  children,
}: ImportProjectCategoriesProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(importProjectCategories, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "importProjectCategories");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(
    contextValue.state,
    "importProjectCategories",
  );

  return (
    <ImportProjectCategoriesContext.Provider value={contextValue}>
      {children}
    </ImportProjectCategoriesContext.Provider>
  );
}
