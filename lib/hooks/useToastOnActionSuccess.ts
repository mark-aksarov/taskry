import { useEffect } from "react";
import { ActionState } from "@/lib/actions/types";
import { useAddSuccessToast } from "./useAddSuccessToast";

export function useToastOnActionSuccess(state: ActionState) {
  const addSuccessToast = useAddSuccessToast();

  useEffect(() => {
    if (state.status === "success" && state.message) {
      addSuccessToast(state.message);
    }
  }, [state, addSuccessToast]);
}
