"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { DeleteEntitiesContextType } from "@/lib/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { deleteTaskCategories } from "@/lib/actions/taskCategory/deleteTaskCategories";

const DeleteTaskCategoriesContext =
  createContext<DeleteEntitiesContextType | null>(null);

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
      onError: () => setIds([]),
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

export function useDeleteTaskCategories() {
  const context = useContext(DeleteTaskCategoriesContext);
  if (!context)
    throw new Error(
      "useDeleteTaskCategories must be used within a DeleteTaskCategoriesProvider",
    );
  return context;
}
