import { useEffect, useRef } from "react";
import { ActionState } from "../actions/types";

export function useCloseModalOnActionSuccess(
  state: ActionState,
  onModalOpenChange: (isOpen: boolean) => void,
) {
  const prevStateRef = useRef<ActionState | null>(null);

  useEffect(() => {
    // Effect triggers when state changes
    if (state !== prevStateRef.current) {
      // Store the current state to avoid run code below for the same state
      prevStateRef.current = state;

      // Close modal when the status is success
      if (state.status === "success") {
        onModalOpenChange(false);
      }
    }
  }, [state, onModalOpenChange]);
}
