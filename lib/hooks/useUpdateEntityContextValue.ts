import { useRouter } from "@/i18n/navigation";
import { useMemo, useActionState, useState } from "react";
import { ActionState, ActionContextType, ActionFn } from "@/lib/actions/types";

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
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, action, isPending] = useActionState(
    async (state: ActionState, payload: FormData) => {
      const newState = await updateFn(state, payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

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
