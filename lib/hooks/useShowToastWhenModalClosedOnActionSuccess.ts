import { useEffect, useRef } from "react";
import { ActionState } from "../actions/types";
import { useAddSuccessToast } from "./useAddSuccessToast";

// Hook than show an success toast when the modal is closed
export function useShowToastWhenModalClosedOnActionSuccess(
  state: ActionState,
  isModalOpen: boolean,
) {
  const prevStateRef = useRef<ActionState | null>(null);
  const addSuccessToast = useAddSuccessToast();

  useEffect(() => {
    if (state !== prevStateRef.current) {
      // Store the current state to avoid run code below for the same state
      prevStateRef.current = state;

      // Show success toast if:
      // The action resulted in an success
      // The modal is currently closed
      if (state.status === "success" && state.message && !isModalOpen) {
        addSuccessToast(state.message);
      }
    }
  }, [state, isModalOpen, addSuccessToast]);
}
