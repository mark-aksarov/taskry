"use client";

import { useRouter } from "@/i18n/navigation";
import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { CreateProjectContext } from "../CreateProjectContext";
import { useModal } from "@/components/common/ModalManagerContext";
import { createProject } from "@/lib/actions/project/createProject";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

interface CreateProjectProviderProps {
  children: React.ReactNode;
}

export function CreateProjectProvider({
  children,
}: CreateProjectProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, payload: FormData) => {
      const newState = await createProject(payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to show created project
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  // we need to track CreateProjectModal open state to show toast
  const { isOpen: isModalOpen, onOpenChange: onModalOpenChange } =
    useModal("createProject");

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
    <CreateProjectContext.Provider value={contextValue}>
      {children}
    </CreateProjectContext.Provider>
  );
}
