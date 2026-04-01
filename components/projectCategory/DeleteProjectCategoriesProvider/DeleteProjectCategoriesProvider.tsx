"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { DeleteProjectCategoriesContext } from "../DeleteProjectCategoriesContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { deleteProjectCategories } from "@/lib/actions/projectCategory/deleteProjectCategories";

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
