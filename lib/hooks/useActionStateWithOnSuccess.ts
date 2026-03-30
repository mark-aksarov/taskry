import { useActionState, useMemo } from "react";
import { ActionState } from "../actions/types";

const initialState: ActionState = {
  status: null,
};

// hook which wraps an action and calls onSuccess when it completes successfully
export function useActionStateWithOnSuccess<T>(
  action: (payload: T) => Promise<ActionState>,
  onSuccess: () => void,
) {
  const [state, dispatchAction, isPending] = useActionState(
    async (_prevState: ActionState, payload: T) => {
      const newState = await action(payload);

      if (newState.status === "success") {
        await onSuccess();
      }

      return newState;
    },
    initialState,
  );

  return useMemo(
    () => ({ state, action: dispatchAction, isPending }),
    [state, dispatchAction, isPending],
  );
}
