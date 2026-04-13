import { useEffect, useRef } from "react";
import { ActionState } from "../actions/types";
import { useAddSuccessToast } from "./useAddSuccessToast";
import { useModal } from "@/components/common/ModalManagerContext";

// Hook than show an success toast when the modal is closed
export function useShowToastWhenModalClosedOnActionSuccess(
  state: ActionState,
  modalId: string,
) {
  const prevStateRef = useRef<ActionState | null>(null);
  const addSuccessToast = useAddSuccessToast();
  const { isOpen } = useModal(modalId);

  useEffect(() => {
    if (state !== prevStateRef.current) {
      // Store the current state to avoid run code below for the same state
      prevStateRef.current = state;

      // Show success toast if:
      // The action resulted in an success
      // The modal is currently closed
      // FIXME: Temporary workaround using setTimeout to ensure toast animation triggers correctly
      setTimeout(() => {
        if (state.status === "success" && state.message && !isOpen) {
          addSuccessToast(state.message);
        }
      });
    }
  }, [state, isOpen, addSuccessToast]);
}
