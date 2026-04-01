"use client";

import { useRouter } from "@/i18n/navigation";
import { DeleteProjectCategoryContext } from "../DeleteProjectCategoryContext";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { deleteProjectCategory } from "@/lib/actions/projectCategory/deleteProjectCategory";

interface DeleteProjectCategoryProviderProps {
  children: React.ReactNode;
}

export function DeleteProjectCategoryProvider({
  children,
}: DeleteProjectCategoryProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(deleteProjectCategory, {
    onSuccess: () => router.refresh(),
  });
  useShowToastOnActionError(contextValue.state);

  return (
    <DeleteProjectCategoryContext.Provider value={contextValue}>
      {children}
    </DeleteProjectCategoryContext.Provider>
  );
}
