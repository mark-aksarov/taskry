import { useEffect, useRef } from "react";
import { ActionState } from "../actions/types";
import { useAddErrorToast } from "./useAddErrorToast";
import { useModal } from "@/components/common/ModalManagerContext";

// Hook than show an error toast when the modal is closed
// When the modal opens, an error shown in the form
export function useShowToastWhenModalClosedOnActionError(
  state: ActionState,
  modalId: string,
) {
  const prevStateRef = useRef<ActionState | null>(null);
  const addErrorToast = useAddErrorToast();
  const { isOpen } = useModal(modalId);

  useEffect(() => {
    if (state !== prevStateRef.current) {
      // Store the current state to avoid run code below for the same state
      prevStateRef.current = state;

      // Show error toast if:
      // The action resulted in an error
      // The modal is currently closed
      if (state.status === "error" && state.message && !isOpen) {
        addErrorToast(state.message);
      }
    }
  }, [state, isOpen, addErrorToast]);
}
