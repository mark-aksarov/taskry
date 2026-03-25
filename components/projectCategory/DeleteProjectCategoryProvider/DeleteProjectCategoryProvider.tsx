"use client";

import { useRouter } from "@/i18n/navigation";
import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { DeleteProjectCategoryContext } from "../DeleteProjectCategoryContext";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { deleteProjectCategory } from "@/lib/actions/projectCategory/deleteProjectCategory";

export const initialState: ActionState = {
  status: null,
};

interface DeleteProjectCategoryProviderProps {
  children: React.ReactNode;
}

export function DeleteProjectCategoryProvider({
  children,
}: DeleteProjectCategoryProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, projectCategoryId: number) => {
      const newState = await deleteProjectCategory(projectCategoryId);

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
    () => ({
      state,
      action,
      isPending,
    }),
    [state, action, isPending],
  );

  return (
    <DeleteProjectCategoryContext.Provider value={contextValue}>
      {children}
    </DeleteProjectCategoryContext.Provider>
  );
}
