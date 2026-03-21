import { useRouter } from "@/i18n/navigation";
import { useMemo, useState, useActionState } from "react";
import { ActionContextType, ActionFn, ActionState } from "@/lib/actions/types";

export const initialState: ActionState = {
  status: null,
};

type TId = number | string;

interface UpdatePersonImagePayload<T extends TId> {
  id: T;
  imageUrl: string | null;
}

/**
 * Shared hook which set person (customer / user) imageUrl to null
 */
export function useDeletePersonImageContextValue<T extends TId>(
  updatePersonImageUrl: ActionFn<ActionState, UpdatePersonImagePayload<T>>,
) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, action, isPending] = useActionState(
    async (state: ActionState, id: T) => {
      const newState = await updatePersonImageUrl(state, {
        id,
        imageUrl: null,
      });

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

export interface DeletePersonImageContextType<T extends TId>
  extends ActionContextType<T> {
  isModalOpen: boolean;
  onModalOpenChange: (isOpen: boolean) => void;
}
