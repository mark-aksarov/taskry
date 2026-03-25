"use client";

import { useRouter } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { useContext, useActionState, useMemo } from "react";
import { useUpdateProjectCategoryModal } from "../UpdateProjectCategoryModal";
import { UpdateProjectCategoryContext } from "../UpdateProjectCategoryContext";
import { updateProjectCategory } from "@/lib/actions/projectCategory/updateProjectCategory";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

interface UpdateProjectCategoryProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectCategoryProvider({
  children,
}: UpdateProjectCategoryProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (state: ActionState, payload: FormData) => {
      const newState = await updateProjectCategory(state, payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  if (state.status === "error" && state.errorCode === "notFound") {
    throw new Error(state.message, { cause: "projectCategoryNotFound" });
  }

  // we need to track UpdateProjectCategoryModal open state to show toast
  const { isOpen: isModalOpen, onOpenChange: onModalOpenChange } =
    useUpdateProjectCategoryModal();

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
    <UpdateProjectCategoryContext.Provider value={contextValue}>
      {children}
    </UpdateProjectCategoryContext.Provider>
  );
}

export function useUpdateProjectCategory() {
  const context = useContext(UpdateProjectCategoryContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectCategory must be used within a UpdateProjectCategoryProvider",
    );
  }
  return context;
}
