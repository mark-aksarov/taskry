"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { DeleteTaskCategoriesContext } from "../DeleteTaskCategoriesContext";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { deleteTaskCategories } from "@/lib/actions/taskCategory/deleteTaskCategories";

interface DeleteTaskCategoriesProviderProps {
  children: React.ReactNode;
}

export function DeleteTaskCategoriesProvider({
  children,
}: DeleteTaskCategoriesProviderProps) {
  // store IDs to track task categories being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const router = useRouter();
  const { state, action, isPending } = useActionStateWithCallbacks(
    deleteTaskCategories,
    {
      onSuccess: () => router.refresh(),
    },
  );

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
