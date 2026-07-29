"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { DeleteEntitiesContextType } from "@/lib/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { deleteProjectCategories } from "@/lib/actions/projectCategory/deleteProjectCategories";

const DeleteProjectCategoriesContext =
  createContext<DeleteEntitiesContextType | null>(null);

interface DeleteProjectCategoriesProviderProps {
  children: React.ReactNode;
}

export function DeleteProjectCategoriesProvider({
  children,
}: DeleteProjectCategoriesProviderProps) {
  // store IDs to track project categories being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const router = useRouter();
  const { state, action, isPending } = useActionStateWithCallbacks(
    deleteProjectCategories,
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
    <DeleteProjectCategoriesContext.Provider value={contextValue}>
      {children}
    </DeleteProjectCategoriesContext.Provider>
  );
}

export function useDeleteProjectCategories() {
  const context = useContext(DeleteProjectCategoriesContext);
  if (!context)
    throw new Error(
      "useDeleteProjectCategories must be used within a DeleteProjectCategoriesContext.Provider",
    );
  return context;
}
