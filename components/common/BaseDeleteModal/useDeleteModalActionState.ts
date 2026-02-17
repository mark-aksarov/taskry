import { useActionState } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useErrorToast } from "@/lib/hooks/useErrorToast";

const initialState: ActionState = {
  status: null,
};

interface useDeleteModalActionStateProps<TPayload> {
  deleteEntity: ActionFn<ActionState, TPayload>;
  onOpenChange?: ((isOpen: boolean) => void) | undefined;
  onSuccess?: () => void;
}

export function useDeleteModalActionState<TPayload>({
  deleteEntity,
  onOpenChange,
  onSuccess,
}: useDeleteModalActionStateProps<TPayload>) {
  // show error toast when delete action fails
  const { close: closeErrorToast, add: addErrorToast } = useErrorToast();

  return useActionState(async (prevState: ActionState, payload: TPayload) => {
    // call server action to perform delete action
    const newState = await deleteEntity(prevState, payload);

    // close error toast
    closeErrorToast();

    // close modal
    if (newState.status === "success") {
      onOpenChange?.(false);
      onSuccess?.();
    }
    // show error toast
    else if (newState.status === "error" && newState.message) {
      addErrorToast(newState.message);
    }

    return newState;
  }, initialState);
}
