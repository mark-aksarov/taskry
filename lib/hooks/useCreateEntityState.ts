import { useMemo, useState, useActionState } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useActionSuccessToast } from "@/lib/hooks/useActionSuccessToast";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useActionErrorToastWhenModalClosed } from "./useActionErrorToastWhenModalClosed";

export const initialState: ActionState = {
  status: null,
};

/**
 * Shared hook for create actions
 */
export function useCreateEntityState(
  createFn: ActionFn<ActionState, FormData>,
) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, action, isPending] = useActionState(createFn, initialState);

  useActionSuccessToast(state);
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
 * Generic type for any create context
 */

export interface CreateEntityContextType {
  isModalOpen: boolean;
  onModalOpenChange: (isOpen: boolean) => void;
  state: ActionState;
  action: (payload: FormData) => void;
  isPending: boolean;
}
