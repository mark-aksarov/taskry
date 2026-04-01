import { useActionState, useMemo } from "react";
import { ActionState } from "../actions/types";

const initialState: ActionState = {
  status: null,
};

type Options = {
  onSuccess?: (state: ActionState) => void | Promise<void>;
  onError?: (state: ActionState) => void | Promise<void>;
  onSettled?: (state: ActionState) => void | Promise<void>;
};

export function useActionStateWithCallbacks<T>(
  action: (payload: T) => Promise<ActionState>,
  { onSuccess, onError, onSettled }: Options = {},
) {
  const [state, dispatchAction, isPending] = useActionState(
    async (_prevState: ActionState, payload: T) => {
      const newState = await action(payload);

      if (newState.status === "success") {
        await onSuccess?.(newState);
      }

      if (newState.status === "error") {
        await onError?.(newState);
      }

      await onSettled?.(newState);

      return newState;
    },
    initialState,
  );

  return useMemo(
    () => ({ state, action: dispatchAction, isPending }),
    [state, dispatchAction, isPending],
  );
}
