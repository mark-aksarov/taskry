"use client";

import { useMemo, useState } from "react";
import { DeleteTaskCategoriesContext } from "../DeleteTaskCategoriesContext";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { deleteTaskCategories } from "@/lib/actions/taskCategory/deleteTaskCategories";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

interface DeleteTaskCategoriesProviderProps {
  children: React.ReactNode;
}

export function DeleteTaskCategoriesProvider({
  children,
}: DeleteTaskCategoriesProviderProps) {
  // store IDs to track task categories being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const { state, action, isPending } =
    useActionStateWithRouteRefresh(deleteTaskCategories);

  useShowToastOnActionError(state);

  const contextValue = useMemo(
    () => ({ state, action, isPending, ids, setIds }),
    [state, action, isPending, ids],
  );

  return (
    <DeleteTaskCategoriesContext.Provider value={contextValue}>
      {children}
    </DeleteTaskCategoriesContext.Provider>
  );
}
