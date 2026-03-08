import { useRouter } from "@/i18n/navigation";
import { useMemo, useState, useActionState } from "react";
import { ActionContextType, ActionFn, ActionState } from "@/lib/actions/types";

export const initialState: ActionState = {
  status: null,
};

/**
 * Shared hook for create actions.
 *
 * Most entities are created via a modal dialog.
 * The only exception is sending a new comment.
 */
export function useCreateEntityContextValue(
  createFn: ActionFn<ActionState, FormData>,
) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, action, isPending] = useActionState(
    async (state: ActionState, payload: FormData) => {
      const newState = await createFn(state, payload);

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

export interface CreateEntityContextType extends ActionContextType {
  isModalOpen: boolean;
  onModalOpenChange: (isOpen: boolean) => void;
}
