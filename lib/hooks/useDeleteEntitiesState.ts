import { useState, useMemo } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { useActionState } from "react";

/**
 * Shared hook for delete actions with IDs array
 */
export function useDeleteEntitiesState<TPayload = any>(
  deleteFn: ActionFn<ActionState, TPayload>,
) {
  const [state, action, isPending] = useActionState(deleteFn, { status: null });
  const [ids, setIds] = useState<number[]>([]);

  useActionErrorToast(state);

  const contextValue = useMemo(
    () => ({ state, action, isPending, ids, setIds }),
    [state, action, isPending, ids],
  );

  return contextValue;
}

/**
 * Generic type for any delete context with IDs array
 */
export interface DeleteEntitiesContextType<TPayload = any> {
  state: ActionState;
  action: (payload: TPayload) => void;
  isPending: boolean;
  ids: number[];
  setIds: (ids: number[]) => void;
}
