import { useState, useMemo, useActionState } from "react";
import { ActionState, ActionFn } from "@/lib/actions/types";
import { useCloseModalOnActionSuccess } from "./useCloseModalOnActionSuccess";
import { useActionErrorToastWhenModalClosed } from "./useActionErrorToastWhenModalClosed";

export const initialState: ActionState = {
  status: null,
};

/**
 * Generic hook for managing update state, modal, and action
 */
export function useUpdateEntityState<TPayload = FormData>(
  updateFn: ActionFn<ActionState, TPayload>,
) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, action, isPending] = useActionState(updateFn, initialState);

  useActionErrorToastWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, setIsModalOpen);

  const contextValue = useMemo(
    () => ({
      isModalOpen,
      onModalOpenChange: setIsModalOpen,
      state,
      action,
      isPending,
    }),
    [isModalOpen, state, action, isPending],
  );

  return contextValue;
}

/**
 * Generic type for any update context
 */
export interface UpdateEntityContextType<TPayload = FormData> {
  isModalOpen: boolean;
  onModalOpenChange: (isOpen: boolean) => void;
  state: ActionState;
  action: (payload: TPayload) => void;
  isPending: boolean;
}
