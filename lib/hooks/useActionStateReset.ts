import { startTransition, useEffect } from "react";
import { ActionState } from "../actions/types";

export function useActionStateReset<TPayload>(
  state: ActionState,
  action: (payload: TPayload | null) => void,
) {
  useEffect(() => {
    startTransition(() => {
      action(null);
    });
  }, [state, action]);
}
