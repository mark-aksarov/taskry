import { useMemo, useActionState, useState } from "react";
import { ActionState, ActionFn, ActionContextType } from "@/lib/actions/types";

export const initialState: ActionState = {
  status: null,
};

/**
 * Shared hook for create actions.
 *
 * Most entities are updated via a modal dialog.
 * The only exception is updating a comment.
 */
export function useUpdateEntityContextValue(
  updateFn: ActionFn<ActionState, FormData>,
) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, action, isPending] = useActionState(updateFn, initialState);

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

export interface UpdateEntityContextType extends ActionContextType {
  isModalOpen: boolean;
  onModalOpenChange: (isOpen: boolean) => void;
}
