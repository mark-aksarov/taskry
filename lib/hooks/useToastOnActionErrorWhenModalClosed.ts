import { useEffect } from "react";
import { ActionState } from "@/lib/actions/types";
import { useAddErrorToast } from "./useAddErrorToast";

export function useToastOnActionErrorWhenModalClosed(
  state: ActionState,
  isModalOpen: boolean,
) {
  const addErrorToast = useAddErrorToast();

  useEffect(() => {
    if (state.status === "error" && state.message) {
      if (!isModalOpen) {
        addErrorToast(state.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
}
