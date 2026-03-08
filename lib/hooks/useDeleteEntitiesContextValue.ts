import { useActionState } from "react";
import { useState, useMemo } from "react";
import { useRouter } from "@/i18n/navigation";
import { ActionFn, ActionState } from "@/lib/actions/types";

export const initialState: ActionState = {
  status: null,
};

/**
 * Shared hook for deleting multiple entities.
 *
 * Tracks selected entity IDs separately so that checkbox changes
 * during the deletion process don’t interfere with action state.
 */
export function useDeleteEntitiesContextValue(
  deleteFn: ActionFn<ActionState, number[]>,
) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (state: ActionState, payload: number[]) => {
      const newState = await deleteFn(state, payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  const [ids, setIds] = useState<number[]>([]);

  const contextValue = useMemo(
    () => ({ state, action, isPending, ids, setIds }),
    [state, action, isPending, ids],
  );

  return contextValue;
}

/**
 * Generic type for any delete context with IDs array
 */
export interface DeleteEntitiesContextType {
  state: ActionState;
  action: (payload: number[]) => void;
  isPending: boolean;
  ids: number[];
  setIds: (ids: number[]) => void;
}
