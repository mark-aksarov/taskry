import { useState, useMemo } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionError } from "@/lib/hooks/useToastOnActionError";
import { useActionState } from "react";

/**
 * Shared hook for deleting multiple entities.
 *
 * Tracks selected entity IDs separately so that checkbox changes
 * during the deletion process don’t interfere with action state.
 */
export function useDeleteEntitiesContextValue(
  deleteFn: ActionFn<ActionState, number[]>,
) {
  const [state, action, isPending] = useActionState(deleteFn, { status: null });
  const [ids, setIds] = useState<number[]>([]);

  useToastOnActionError(state);

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
