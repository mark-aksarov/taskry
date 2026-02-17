import { useContext } from "react";
import { OverlayTriggerStateContext } from "react-aria-components";

export function useCloseOverlay() {
  const context = useContext(OverlayTriggerStateContext);

  if (!context) {
    throw new Error("FormBase must be used within a OverlayTriggerProvider");
  }

  const { close } = context;

  return close;
}
