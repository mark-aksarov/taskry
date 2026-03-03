import { useMemo } from "react";
import { useActionState } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { useRefreshCommentsOnActionSuccess } from "./useRefreshCommentsOnActionSuccess";
import { useCommentFormResetOnActionSuccess } from "./useCommentFormResetOnActionSuccess";

export const initialState: ActionState = {
  status: null,
};

/**
 * Hook that encapsulates send comment logic
 */
export function useSendCommentState(
  sendCommentFn: ActionFn<ActionState, FormData>,
) {
  const [state, action, isPending] = useActionState(
    sendCommentFn,
    initialState,
  );

  useActionErrorToast(state);
  useRefreshCommentsOnActionSuccess(state);
  useCommentFormResetOnActionSuccess(state);

  const contextValue = useMemo(
    () => ({ state, action, isPending }),
    [state, action, isPending],
  );

  return contextValue;
}

/**
 * Generic type for send comment context
 */
export interface SendCommentContextType {
  state: ActionState;
  action: (payload: FormData) => void;
  isPending: boolean;
}
