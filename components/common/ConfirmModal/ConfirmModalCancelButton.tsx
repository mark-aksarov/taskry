import { useContext } from "react";
import { PressEvent } from "react-aria";
import { Button } from "@/components/ui";
import { OverlayTriggerStateContext } from "react-aria-components";

interface ConfirmModalProps {
  label: string;
  onCancel?: () => void;
}

export function ConfirmModalCancelButton({
  label,
  onCancel,
}: ConfirmModalProps) {
  const state = useContext(OverlayTriggerStateContext);

  function handlePress(e: PressEvent) {
    if (state) state.close();
    onCancel?.();
  }

  return (
    <Button
      variant="outlined"
      label={label}
      onPress={handlePress}
      size="medium"
      className="py-2"
    />
  );
}
