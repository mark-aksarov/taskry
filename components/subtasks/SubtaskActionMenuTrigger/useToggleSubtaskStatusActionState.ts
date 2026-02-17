import {
  ActionFn,
  ActionState,
  ToggleSubtaskPayload,
} from "@/lib/actions/types";
import { useActionState } from "react";
import { useErrorToast } from "@/lib/hooks/useErrorToast";

const toggleSubtaskInitialState: ActionState = {
  status: null,
};

interface useToggleSubtaskStatusActionStateProps {
  toggleSubtask: ActionFn<ActionState, ToggleSubtaskPayload>;
  mutate?: () => void;
}

export function useToggleSubtaskStatusActionState({
  toggleSubtask,
  mutate,
}: useToggleSubtaskStatusActionStateProps) {
  const { close: closeErrorToast, add: addErrorToast } = useErrorToast();

  return useActionState(
    async (prevState: ActionState, payload: ToggleSubtaskPayload) => {
      // call server action to perform toggle subtask status action
      const newState = await toggleSubtask(prevState, payload);

      // close error toast
      closeErrorToast();

      // call swr mutate to refresh subtasks
      if (newState.status === "success") {
        mutate?.();
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
