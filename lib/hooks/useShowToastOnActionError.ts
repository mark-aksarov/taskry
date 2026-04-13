import { useEffect, useRef } from "react";
import { ActionState } from "../actions/types";
import { useAddErrorToast } from "./useAddErrorToast";

export function useShowToastOnActionError(state: ActionState) {
  const prevStateRef = useRef<ActionState | null>(null);
  const addErrorToast = useAddErrorToast();

  useEffect(() => {
    // Effect triggers when state changes
    if (state !== prevStateRef.current) {
      // Store the current state to avoid run code below for the same state
      prevStateRef.current = state;

      // Show error toast when the status is error
      //FIXME: Temporary workaround using setTimeout to ensure toast animation triggers correctly
      setTimeout(() => {
        if (state.status === "error" && state.message) {
          addErrorToast(state.message);
        }
      });
    }
  }, [state, addErrorToast]);
}
