import { useEffect, useRef } from "react";
import { ActionState } from "../actions/types";
import { useAddErrorToast } from "./useAddErrorToast";

// Hook than show an error toast when the modal is closed
export function useShowToastWhenModalClosedOnActionError(
  state: ActionState,
  isModalOpen: boolean,
) {
  const prevStateRef = useRef<ActionState | null>(null);
  const addErrorToast = useAddErrorToast();

  useEffect(() => {
    if (state !== prevStateRef.current) {
      // Store the current state to avoid run code below for the same state
      prevStateRef.current = state;

      // Show error toast if:
      // The action resulted in an error
      // The modal is currently closed
      if (state.status === "error" && state.message && !isModalOpen) {
        addErrorToast(state.message);
      }
    }
  }, [state, isModalOpen, addErrorToast]);
}
