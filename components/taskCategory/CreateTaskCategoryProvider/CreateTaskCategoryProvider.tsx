"use client";

import { useRouter } from "@/i18n/navigation";
import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { useCreateTaskCategoryModal } from "../CreateTaskCategoryModal";
import { CreateTaskCategoryContext } from "../CreateTaskCategoryContext";
import { createTaskCategory } from "@/lib/actions/taskCategory/createTaskCategory";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

interface CreateTaskCategoryProviderProps {
  children: React.ReactNode;
}

export function CreateTaskCategoryProvider({
  children,
}: CreateTaskCategoryProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, payload: FormData) => {
      const newState = await createTaskCategory(payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to show created project category
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  // we need to track CreateTaskCategoryModal open state to show toast
  const { isOpen: isModalOpen, onOpenChange: onModalOpenChange } =
    useCreateTaskCategoryModal();

  // hooks below wait for the transition to complete (reducerAction returns the new state)
  useCloseModalThenShowToastOnActionSuccess(
    state,
    isModalOpen,
    onModalOpenChange,
  );
  useShowToastWhenModalClosedOnActionSuccess(state, isModalOpen);
  useShowToastWhenModalClosedOnActionError(state, isModalOpen);

  const contextValue = useMemo(
    () => ({
      state,
      action,
      isPending,
    }),
    [state, action, isPending],
  );

  return (
    <CreateTaskCategoryContext.Provider value={contextValue}>
      {children}
    </CreateTaskCategoryContext.Provider>
  );
}
