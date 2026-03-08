import { useEffect } from "react";
import { ActionState } from "../actions/types";
import { useAddSuccessToast } from "./useAddSuccessToast";

export function useShowToastOnActionSuccess(state: ActionState) {
  const addSuccessToast = useAddSuccessToast();

  // Show success toast when the status is success
  useEffect(() => {
    if (state.status === "success" && state.message) {
      addSuccessToast(state.message);
    }
  }, [state, addSuccessToast]);
}
