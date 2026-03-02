import { useEffect } from "react";
import { ActionState } from "@/lib/actions/types";
import { useAddErrorToast } from "./useAddErrorToast";

export function useActionErrorToast(state: ActionState) {
  const addErrorToast = useAddErrorToast();

  useEffect(() => {
    if (state.status === "error" && state.message) {
      addErrorToast(state.message);
    }
  }, [state, addErrorToast]);
}
