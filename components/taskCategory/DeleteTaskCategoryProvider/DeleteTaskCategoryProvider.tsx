"use client";

import { useRouter } from "@/i18n/navigation";
import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { DeleteTaskCategoryContext } from "../DeleteTaskCategoryContext";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { deleteTaskCategory } from "@/lib/actions/taskCategory/deleteTaskCategory";

const initialState: ActionState = {
  status: null,
};

interface DeleteTaskCategoryProviderProps {
  children: React.ReactNode;
}

export function DeleteTaskCategoryProvider({
  children,
}: DeleteTaskCategoryProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, taskCategoryId: number) => {
      const newState = await deleteTaskCategory(taskCategoryId);

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
    () => ({
      state,
      action,
      isPending,
    }),
    [state, action, isPending],
  );

  return (
    <DeleteTaskCategoryContext.Provider value={contextValue}>
      {children}
    </DeleteTaskCategoryContext.Provider>
  );
}
