"use client";

import { Button } from "@/components/ui/Button";

interface ConfirmModalProps {
  label: string;
  onConfirm: () => void;
  "data-test"?: string;
}

export function ConfirmModalConfirmButton({
  label,
  onConfirm,
  ...props
}: ConfirmModalProps) {
  const handlePress = () => onConfirm();

  return (
    <Button
      variant="contrast"
      label={label}
      onPress={handlePress}
      size="medium"
      className="py-2"
      {...props}
    />
  );
}
