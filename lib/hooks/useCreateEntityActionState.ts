import { useActionState, useContext } from "react";
import { ActionFn, ActionState } from "../actions/types";
import { useSuccessToast } from "@/lib/hooks/useSuccessToast";
import { OverlayTriggerStateContext } from "react-aria-components";

const initialState: ActionState = {
  status: null,
};

interface useCreateEntityActionStateProps {
  createEntity: ActionFn<ActionState, FormData>;
  formRef: React.RefObject<HTMLFormElement | null>;
  successMessage: string;
}

export function useCreateEntityActionState({
  createEntity,
  formRef,
  successMessage,
}: useCreateEntityActionStateProps) {
  // useUpdateEntityActionState must be used within a FormBaseModal, which provides OverlayTriggerStateContext
  const { close: closeModal } = useContext(OverlayTriggerStateContext)!;
  const { add: addSuccessToast } = useSuccessToast();

  return useActionState(async (prevState: ActionState, payload: FormData) => {
    const newState = await createEntity(prevState, payload);

    // side effects
    if (newState.status === "success") {
      // close the modal only if the form is not unmounted
      if (formRef.current) {
        closeModal();
      }

      addSuccessToast(successMessage);
    }

    return newState;
  }, initialState);
}
