"use client";

import { useRouter } from "@/i18n/navigation";
import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { CreateSubtaskContext } from "../CreateSubtaskContext";
import { useModal } from "@/components/common/ModalManagerContext";
import { createSubtask } from "@/lib/actions/subtask/createSubtask";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const initialState: ActionState = {
  status: null,
};

interface CreateSubtaskAltProviderProps {
  children: React.ReactNode;
}

export function CreateSubtaskAltProvider({
  children,
}: CreateSubtaskAltProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, payload: FormData) => {
      const newState = await createSubtask(payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to show created subtask
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  // we need to track CreateSubtaskModal open state to show toast
  const { isOpen: isModalOpen, onOpenChange: onModalOpenChange } =
    useModal("createSubtask");

  // hooks below wait for the transition to complete (reducerAction returns the new state)
  useCloseModalOnActionSuccess(state, onModalOpenChange);
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
    <CreateSubtaskContext.Provider value={contextValue}>
      {children}
    </CreateSubtaskContext.Provider>
  );
}
