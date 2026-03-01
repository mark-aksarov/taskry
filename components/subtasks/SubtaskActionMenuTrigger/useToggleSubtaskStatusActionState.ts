import {
  ActionFn,
  ActionState,
  ToggleSubtaskPayload,
} from "@/lib/actions/types";
import { useActionState } from "react";
import { useErrorToast } from "@/lib/hooks/useErrorToast";
import { useSuccessToast } from "@/lib/hooks/useSuccessToast";

const toggleSubtaskInitialState: ActionState = {
  status: null,
};

interface useToggleSubtaskStatusActionStateProps {
  toggleSubtask: ActionFn<ActionState, ToggleSubtaskPayload>;
  mutate?: () => void;
  successMessage: string;
}

export function useToggleSubtaskStatusActionState({
  toggleSubtask,
  mutate,
  successMessage,
}: useToggleSubtaskStatusActionStateProps) {
  const { add: addSuccessToast } = useSuccessToast();
  const { close: closeErrorToast, add: addErrorToast } = useErrorToast();

  return useActionState(
    async (prevState: ActionState, payload: ToggleSubtaskPayload) => {
      // call server action to perform toggle subtask status action
      const newState = await toggleSubtask(prevState, payload);

      // close error toast
      closeErrorToast();

      if (newState.status === "success") {
        // call swr mutate to refresh subtasks
        mutate?.();
        // show success toast
        addSuccessToast(successMessage);
      }
      // show error toast
      else if (newState.status === "error" && newState.message) {
        addErrorToast(newState.message);
      }

      return newState;
    },
    toggleSubtaskInitialState,
  );
}
