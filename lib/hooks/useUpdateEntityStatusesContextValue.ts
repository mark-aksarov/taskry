import {
  ActionFn,
  ActionState,
  UpdateTaskStatusesPayload,
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";
import { useState, useMemo, useActionState } from "react";

export const initialState: ActionState = {
  status: null,
};

/**
 * Shared hook for update statuses actions with IDs array
 */
type TPayload = UpdateProjectStatusesPayload | UpdateTaskStatusesPayload;

export function useUpdateEntityStatusesContextValue(
  updateFn: ActionFn<ActionState, TPayload>,
) {
  const [state, action, isPending] = useActionState(updateFn, initialState);
  const [ids, setIds] = useState<number[]>([]);

  const contextValue = useMemo(
    () => ({
      state,
      action,
      isPending,
      ids,
      setIds,
    }),
    [state, action, isPending, ids],
  );

  return contextValue;
}

/**
 * Generic type for update statuses context
 */
export interface UpdateEntityStatusesContextType {
  state: ActionState;
  action: (payload: TPayload) => void;
  isPending: boolean;
  ids: number[];
  setIds: (ids: number[]) => void;
}
