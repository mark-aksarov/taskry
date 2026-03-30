import { ActionState } from "../actions/types";
import { useEffect, useRef, useState } from "react";
import { useAddSuccessToast } from "./useAddSuccessToast";
import { overlayTransitionDuration } from "@/components/ui/styles";
import { useModal } from "@/components/common/ModalManagerContext";

// Hook that closes the modal and then shows a toast.
// Note: this hook does not show a toast if the modal is already closed.
export function useCloseModalThenShowToastOnActionSuccess(
  state: ActionState,
  modalId: string,
) {
  const prevStateRef = useRef<ActionState | null>(null);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const addSuccessToast = useAddSuccessToast();
  const { isOpen, onOpenChange } = useModal(modalId);

  // Watch for changes in action state to handle modal closing and toast display
  useEffect(() => {
    if (state !== prevStateRef.current) {
      // Store the current state to avoid run code below for the same state
      prevStateRef.current = state;

      // If the action succeeded and the modal is open, close the modal and mark the toast message as pending
      // It will be displayed after the modal finishes closing
      if (state.status === "success" && isOpen) {
        onOpenChange(false);
        if (state.message) {
          setPendingMessage(state.message);
        }
      }
    }
  }, [state, isOpen, onOpenChange]);

  // Show the toast after the modal has fully closed
  useEffect(() => {
    if (pendingMessage) {
      // delay the toast to allow modal closing animations to finish
      const timer = setTimeout(() => {
        addSuccessToast(pendingMessage);
        setPendingMessage(null);
      }, overlayTransitionDuration);

      return () => clearTimeout(timer);
    }
  }, [pendingMessage, addSuccessToast]);
}
