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
  onSuccess?: () => void,
) {
  const [state, action, isPending] = useActionState(
    async (state: ActionState, payload: T) => {
      const newState = await deleteFn(state, payload);

      // "Escape hatch": call onSuccess here because the provider will unmount
      // immediately after successful deletion, so side effects outside the reducerAction would fail
      if (newState.status === "success") {
        onSuccess?.();
      }

      return newState;
    },
    initialState,
  );

  const contextValue = useMemo(
    () => ({ state, action, isPending }),
    [state, action, isPending],
  );

  return contextValue;
}

// Generic delete context type with TPayload constraint
export interface DeleteEntityContextType<T extends TPayload>
  extends ActionContextType<T> {}
