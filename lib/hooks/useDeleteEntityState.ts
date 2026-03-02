import { useMemo } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { useActionState } from "react";

/**
 * Hook that encapsulates delete logic for any entity
 */
export function useDeleteEntityState<TPayload = any>(
  deleteFn: ActionFn<ActionState, TPayload>,
) {
  const [state, action, isPending] = useActionState(deleteFn, { status: null });

  useActionErrorToast(state);

  const contextValue = useMemo(
    () => ({ state, action, isPending }),
    [state, action, isPending],
  );

  return contextValue;
}

/**
 * Generic type for any delete context
 */
export interface DeleteEntityContextType<TPayload = any> {
  state: ActionState;
  action: (payload: TPayload) => void;
  isPending: boolean;
}
