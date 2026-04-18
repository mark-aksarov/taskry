import { useEffect, useRef } from "react";
import { ActionState } from "../actions/types";
import { useAddSuccessToast } from "./useAddSuccessToast";

export function useShowToastOnActionSuccess(state: ActionState) {
  const prevStateRef = useRef<ActionState | null>(null);
  const addSuccessToast = useAddSuccessToast();

  useEffect(() => {
    // Effect triggers when state changes
    if (state !== prevStateRef.current) {
      // Store the current state to avoid run code below for the same state
      prevStateRef.current = state;

      // Show success toast when the status is success
      if (state.status === "success" && state.message) {
        addSuccessToast(state.message);
      }
    }
  }, [state, addSuccessToast]);
}
