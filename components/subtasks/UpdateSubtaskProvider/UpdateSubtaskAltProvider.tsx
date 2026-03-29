"use client";

import { useRouter } from "@/i18n/navigation";
import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { UpdateSubtaskContext } from "../UpdateSubtaskContext";
import { useModal } from "@/components/common/ModalManagerContext";
import { updateSubtask } from "@/lib/actions/subtask/updateSubtask";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const initialState: ActionState = {
  status: null,
};

interface UpdateSubtaskAltProviderProps {
  children: React.ReactNode;
}

export function UpdateSubtaskAltProvider({
  children,
}: UpdateSubtaskAltProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, payload: FormData) => {
      const newState = await updateSubtask(payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to show updated subtask
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  // we need to track UpdateSubtaskModal open state to show toast
  const { isOpen: isModalOpen, onOpenChange: onModalOpenChange } =
    useModal("updateSubtask");

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
    <UpdateSubtaskContext.Provider value={contextValue}>
      {children}
    </UpdateSubtaskContext.Provider>
  );
}
