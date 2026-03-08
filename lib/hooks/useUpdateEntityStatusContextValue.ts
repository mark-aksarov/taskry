import {
  ActionFn,
  ActionState,
  UpdateTaskStatusPayload,
  UpdateProjectStatusPayload,
} from "@/lib/actions/types";

import { useRouter } from "@/i18n/navigation";
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
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (state: ActionState, payload: UpdateProjectStatusPayload) => {
      const newState = await updateFn(state, payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

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
