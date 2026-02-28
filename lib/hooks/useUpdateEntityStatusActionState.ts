import { useActionState } from "react";
import { useErrorToast } from "./useErrorToast";
import { ActionFn, ActionState } from "../actions/types";

const initialState: ActionState = {
  status: null,
};

interface useDeleteEntityActionStateProps<TPayload> {
  updateEntityStatus: ActionFn<ActionState, TPayload>;
}

export function useUpdateEntityStatusActionState<TPayload>({
  updateEntityStatus,
}: useDeleteEntityActionStateProps<TPayload>) {
  const { close: closeErrorToast, add: addErrorToast } = useErrorToast();

  return useActionState(async (prevState: ActionState, payload: TPayload) => {
    // call server action to perform delete action
    const newState = await updateEntityStatus(prevState, payload);

    // close error toast
    closeErrorToast();

    // show error toast
    if (newState.status === "error" && newState.message) {
      addErrorToast(newState.message);
    }

    return newState;
  }, initialState);
}
