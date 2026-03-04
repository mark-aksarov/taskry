import {
  ActionFn,
  ActionState,
  UpdateTaskStatusPayload,
  UpdateProjectStatusPayload,
} from "@/lib/actions/types";
import { useMemo, useActionState } from "react";

export const initialState: ActionState = {
  status: null,
};

/**
 * Generic hook for managing update status of task or project
 */
type TPayload = UpdateProjectStatusPayload | UpdateTaskStatusPayload;

export function useUpdateEntityStatusContextValue(
  updateFn: ActionFn<ActionState, TPayload>,
) {
  const [state, action, isPending] = useActionState(updateFn, initialState);

  const contextValue = useMemo(
    () => ({
      state,
      action,
      isPending,
    }),
    [state, action, isPending],
  );

  return contextValue;
}

/**
 * Generic type for update status context
 */
export interface UpdateEntityStatusContextType {
  state: ActionState;
  action: (payload: TPayload) => void;
  isPending: boolean;
}
