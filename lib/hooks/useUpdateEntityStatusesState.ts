import { useState, useMemo, useActionState } from "react";
import { ActionState, ActionFn } from "@/lib/actions/types";
import { useActionErrorToast } from "./useActionErrorToast";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

export const initialState: ActionState = {
  status: null,
};

/**
 * Shared hook for update statuses actions with IDs array
 */
type TPayload = { ids: number[]; nextStatus: ProjectStatus | TaskStatus };

export function useUpdateEntityStatusesState(
  updateFn: ActionFn<ActionState, TPayload>,
) {
  const [state, action, isPending] = useActionState(updateFn, initialState);
  const [ids, setIds] = useState<number[]>([]);

  useActionErrorToast(state);

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
