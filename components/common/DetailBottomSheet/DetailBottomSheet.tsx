import { useContext } from "react";
import { BottomSheet, BottomSheetProps } from "@/components/ui";
import { OverlayTriggerStateContext } from "react-aria-components";

export function DetailBottomSheet(props: Omit<BottomSheetProps, "state">) {
  const state = useContext(OverlayTriggerStateContext);

  if (!state) {
    throw new Error(
      "DetailBottomSheet must be used within a OverlayTriggerProvider",
    );
  }

  return (
    <BottomSheet isDismissable state={state} className="md:hidden" {...props} />
  );
}
