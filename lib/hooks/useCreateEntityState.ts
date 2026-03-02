import { useState, useMemo } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useActionSuccessToast } from "@/lib/hooks/useActionSuccessToast";
import { useActionStateWithReset } from "@/lib/hooks/useActionStateWithReset";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useModalOpenChangeWithActionReset } from "@/lib/hooks/useModalOpenChangeWithActionReset";

export const initialState: ActionState = { status: null };

/**
 * Shared hook for create actions
 */
export function useCreateEntityState(
  createFn: ActionFn<ActionState, FormData>,
) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, action, isPending] = useActionStateWithReset(
    createFn,
    initialState,
  );

  useActionSuccessToast(state);
  useCloseModalOnActionSuccess(state, setIsModalOpen);

  const onModalOpenChange = useModalOpenChangeWithActionReset(
    action,
    setIsModalOpen,
  );

  const contextValue = useMemo(
    () => ({ isModalOpen, onModalOpenChange, state, action, isPending }),
    [isModalOpen, onModalOpenChange, state, action, isPending],
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
  action: (payload: FormData | null) => void;
  isPending: boolean;
}
