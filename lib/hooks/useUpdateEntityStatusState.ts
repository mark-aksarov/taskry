import { useMemo, useActionState } from "react";
import { ActionState, ActionFn } from "@/lib/actions/types";
import { useActionErrorToast } from "./useActionErrorToast";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

export const initialState: ActionState = {
  status: null,
};

/**
 * Generic hook for managing update status of task or project
 */
type TPayload = { ids: number[]; nextStatus: ProjectStatus | TaskStatus };

export function useUpdateEntityStatusState(
  updateFn: ActionFn<ActionState, TPayload>,
) {
  const [state, action, isPending] = useActionState(updateFn, initialState);

  useActionErrorToast(state);

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
