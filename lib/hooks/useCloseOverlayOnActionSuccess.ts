import { useContext, useEffect } from "react";
import { ActionState } from "../actions/types";
import { OverlayTriggerStateContext } from "react-aria-components";

export function useCloseOverlayOnActionSuccess(state: ActionState) {
  const context = useContext(OverlayTriggerStateContext);

  if (!context) {
    throw new Error("FormBase must be used within a OverlayTriggerProvider");
  }

  const { close } = context;

  useEffect(() => {
    if (state.status === "success") {
      close();
    }
  }, [state, close]);
}
