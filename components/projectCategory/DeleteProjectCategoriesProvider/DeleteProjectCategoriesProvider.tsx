"use client";

import { useMemo, useState } from "react";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { DeleteProjectCategoriesContext } from "../DeleteProjectCategoriesContext";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";
import { deleteProjectCategories } from "@/lib/actions/projectCategory/deleteProjectCategories";

interface DeleteProjectCategoriesProviderProps {
  children: React.ReactNode;
}

export function DeleteProjectCategoriesProvider({
  children,
}: DeleteProjectCategoriesProviderProps) {
  // store IDs to track project categories being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const { state, action, isPending } = useActionStateWithRouteRefresh(
    deleteProjectCategories,
  );

  useShowToastOnActionError(state);

  const contextValue = useMemo(
    () => ({ state, action, isPending, ids, setIds }),
    [state, action, isPending, ids],
  );

  return (
    <DeleteProjectCategoriesContext.Provider value={contextValue}>
      {children}
    </DeleteProjectCategoriesContext.Provider>
  );
}
