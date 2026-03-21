import { useContext } from "react";
import { OverlayTriggerStateContext } from "react-aria-components";

export function useFilterSubmitSideEffects(options?: {
  clearSelectedItems?: () => void;
}) {
  // FiltersForm can only be used inside the FiltersModal
  const { close: closeModal } = useContext(OverlayTriggerStateContext)!;

  return () => {
    // close the form modal immediately
    closeModal();

    // Clear the selected items in list / grid
    options?.clearSelectedItems?.();
  };
}
