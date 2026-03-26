"use client";

import { useRouter } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { useActionState, useMemo, useState } from "react";
import { DeleteTaskCategoriesContext } from "../DeleteTaskCategoriesContext";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { deleteTaskCategories } from "@/lib/actions/taskCategory/deleteTaskCategories";

const initialState: ActionState = {
  status: null,
};

interface DeleteTaskCategoriesProviderProps {
  children: React.ReactNode;
}

export function DeleteTaskCategoriesProvider({
  children,
}: DeleteTaskCategoriesProviderProps) {
  const router = useRouter();

  // store IDs to track task categories being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, ids: number[]) => {
      const newState = await deleteTaskCategories(ids);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to update task category list
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
    <DeleteTaskCategoriesContext.Provider value={contextValue}>
      {children}
    </DeleteTaskCategoriesContext.Provider>
  );
}
