"use client";

import { useRouter } from "@/i18n/navigation";
import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { useUpdatePositionModal } from "../UpdatePositionModal";
import { UpdatePositionContext } from "../UpdatePositionContext";
import { updatePosition } from "@/lib/actions/position/updatePosition";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

interface UpdatePositionProviderProps {
  children: React.ReactNode;
}

export function UpdatePositionProvider({
  children,
}: UpdatePositionProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (state: ActionState, payload: FormData) => {
      const newState = await updatePosition(state, payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to show updated position
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  if (state.status === "error" && state.errorCode === "notFound") {
    throw new Error(state.message, { cause: "positionNotFound" });
  }

  // we need to track UpdatePositionModal open state to show toast
  const { isOpen: isModalOpen, onOpenChange: onModalOpenChange } =
    useUpdatePositionModal();

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
    <UpdatePositionContext.Provider value={contextValue}>
      {children}
    </UpdatePositionContext.Provider>
  );
}
