import { useActionState } from "react";
import { ActionFn, ActionState } from "../actions/types";

export function useActionStateWithReset<TPayload>(
  action: ActionFn<ActionState, TPayload>,
  initialState: ActionState,
) {
  return useActionState(action, initialState);
}
