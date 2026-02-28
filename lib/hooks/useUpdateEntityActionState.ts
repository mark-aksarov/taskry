import { useErrorToast } from "./useErrorToast";
import { useActionState, useContext } from "react";
import { useSuccessToast } from "./useSuccessToast";
import { ActionFn, ActionState } from "../actions/types";
import { OverlayTriggerStateContext } from "react-aria-components";

const initialState: ActionState = {
  status: null,
};

interface useUpdateEntityActionStateProps {
  updateEntity: ActionFn<ActionState, FormData>;
  onSuccess?: () => void;
  successMessage: string;
}

export function useUpdateEntityActionState({
  updateEntity,
  onSuccess,
  successMessage,
}: useUpdateEntityActionStateProps) {
  // useUpdateEntityActionState must be used within a FormBaseModal, which provides OverlayTriggerStateContext
  const { close: closeModal } = useContext(OverlayTriggerStateContext)!;
  const { add: addSuccessToast } = useSuccessToast();
  const { close: closeErrorToast, add: addErrorToast } = useErrorToast();

  return useActionState(async (prevState: ActionState, payload: FormData) => {
    // call server action to perform update action
    const newState = await updateEntity(prevState, payload);

    // side effects
    closeErrorToast();

    if (newState.status === "success") {
      onSuccess?.();
      addSuccessToast(successMessage);
      closeModal();
    } else if (newState.status === "error" && newState.message) {
      addErrorToast(newState.message);
    }

    return newState;
  }, initialState);
}
