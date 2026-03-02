import { useState, useMemo } from "react";
import { ActionState, ActionFn } from "@/lib/actions/types";
import { useActionStateWithReset } from "./useActionStateWithReset";
import { useCloseModalOnActionSuccess } from "./useCloseModalOnActionSuccess";
import { useModalOpenChangeWithActionReset } from "./useModalOpenChangeWithActionReset";

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

  const [state, action, isPending] = useActionStateWithReset(
    updateFn,
    initialState,
  );

  useCloseModalOnActionSuccess(state, setIsModalOpen);

  const onModalOpenChange = useModalOpenChangeWithActionReset(
    action,
    setIsModalOpen,
  );

  const contextValue = useMemo(
    () => ({
      isModalOpen,
      onModalOpenChange,
      state,
      action,
      isPending,
    }),
    [isModalOpen, onModalOpenChange, state, action, isPending],
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
