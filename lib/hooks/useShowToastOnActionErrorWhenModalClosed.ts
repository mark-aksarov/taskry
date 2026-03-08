import { useEffect } from "react";
import { ActionState } from "../actions/types";
import { useAddErrorToast } from "./useAddErrorToast";

export function useShowToastOnActionErrorWhenModalClosed(
  state: ActionState,
  isModalOpen: boolean,
) {
  const addErrorToast = useAddErrorToast();

  /*
   * Do not show error toast for the same state when the modal is open again
   */
  useEffect(() => {
    if (state.status === "error" && state.message) {
      if (!isModalOpen) {
        addErrorToast(state.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, addErrorToast]);
}
