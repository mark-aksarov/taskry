"use client";

import { DeleteProjectCategoryContext } from "../DeleteProjectCategoryContext";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { deleteProjectCategory } from "@/lib/actions/projectCategory/deleteProjectCategory";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

interface DeleteProjectCategoryProviderProps {
  children: React.ReactNode;
}

export function DeleteProjectCategoryProvider({
  children,
}: DeleteProjectCategoryProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(deleteProjectCategory);
  useShowToastOnActionError(contextValue.state);

  return (
    <DeleteProjectCategoryContext.Provider value={contextValue}>
      {children}
    </DeleteProjectCategoryContext.Provider>
  );
}
