import { useActionState } from "react";
import { ActionFn, ActionState } from "../actions/types";

export function useActionStateWithReset<TPayload>(
  action: ActionFn<ActionState, TPayload>,
  initialState: ActionState,
) {
  return useActionState(
    async (prevState: ActionState, payload: TPayload | null) => {
      if (payload === null) {
        return initialState;
      }

      const newState = await action(prevState, payload);
      return newState;
    },
    initialState,
  );
}
