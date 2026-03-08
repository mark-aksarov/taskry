import { useEffect } from "react";
import { ActionState } from "../actions/types";
import { useAddErrorToast } from "./useAddErrorToast";

export function useShowToastOnActionError(state: ActionState) {
  const addErrorToast = useAddErrorToast();

  // Show error toast when the status is error
  useEffect(() => {
    if (state.status === "error" && state.message) {
      addErrorToast(state.message);
    }
  }, [state, addErrorToast]);
}
