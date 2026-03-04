import { useEffect } from "react";
import { ActionState } from "../actions/types";

export function useCloseModalOnActionSuccess(
  state: ActionState,
  onModalOpenChange: (isOpen: boolean) => void,
) {
  useEffect(() => {
    if (state.status === "success") {
      onModalOpenChange(false);
    }
  }, [state, onModalOpenChange]);
}
