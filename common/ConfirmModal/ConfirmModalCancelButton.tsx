"use client";

import { useContext } from "react";
import { Button } from "@/ui/Button";
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

  function handlePress() {
    if (state) state.close();
    onCancel?.();
  }

  return (
    <Button
      variant="primary"
      outlined
      label={label}
      onPress={handlePress}
      size="medium"
      className="py-2"
    />
  );
}
