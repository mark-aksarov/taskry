import { useEffect, useRef } from "react";
import { ActionState } from "../actions/types";
import { useModal } from "@/common/ModalManagerContext";

export function useCloseModalOnActionSuccess(
  state: ActionState,
  modalId: string,
) {
  const prevStateRef = useRef<ActionState | null>(null);
  const { onOpenChange: onModalOpenChange } = useModal(modalId);

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
