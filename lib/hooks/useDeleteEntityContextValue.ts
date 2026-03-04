import { useMemo } from "react";
import { useActionState } from "react";
import { ActionContextType, ActionFn, ActionState } from "@/lib/actions/types";

export const initialState: ActionState = {
  status: null,
};

type TId = string | number;
type TPayload = TId | { id: TId; shouldRedirect: boolean };

/**
 * Shared hook for delete actions.
 */
export function useDeleteEntityContextValue<T extends TPayload>(
  deleteFn: ActionFn<ActionState, T>,
) {
  const [state, action, isPending] = useActionState(deleteFn, initialState);

  const contextValue = useMemo(
    () => ({ state, action, isPending }),
    [state, action, isPending],
  );

  return contextValue;
}

// Generic delete context type with TPayload constraint
export interface DeleteEntityContextType<T extends TPayload>
  extends ActionContextType<T> {}
