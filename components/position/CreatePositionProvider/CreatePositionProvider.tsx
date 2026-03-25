"use client";

import { useActionState, useMemo } from "react";
import { useRouter } from "@/i18n/navigation";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useCreatePositionModal } from "../CreatePositionModal";
import { CreatePositionContext } from "../CreatePositionContext";
import { createPosition } from "@/lib/actions/position/createPosition";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

export const initialState: ActionState = {
  status: null,
};

interface CreatePositionProviderProps {
  children: React.ReactNode;
}

export function CreatePositionProvider({
  children,
}: CreatePositionProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (state: ActionState, payload: FormData) => {
      const newState = await createPosition(state, payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  // we need to track CreatePositionModal open state to show toast
  const { isOpen: isModalOpen, onOpenChange: onModalOpenChange } =
    useCreatePositionModal();

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
    <CreatePositionContext.Provider value={contextValue}>
      {children}
    </CreatePositionContext.Provider>
  );
}
