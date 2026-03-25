"use client";

import { useRouter } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { useMemo, useState, useActionState } from "react";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { DeleteProjectCategoriesContext } from "../DeleteProjectCategoriesContext";
import { deleteProjectCategories } from "@/lib/actions/projectCategory/deleteProjectCategories";

const initialState: ActionState = {
  status: null,
};

interface DeleteProjectCategoriesProviderProps {
  children: React.ReactNode;
}

export function DeleteProjectCategoriesProvider({
  children,
}: DeleteProjectCategoriesProviderProps) {
  const router = useRouter();

  // store IDs to track project categories being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const [state, action, isPending] = useActionState(
    async (state: ActionState, ids: number[]) => {
      const newState = await deleteProjectCategories(state, ids);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to update project category list
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  // wait for transition to finish
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
