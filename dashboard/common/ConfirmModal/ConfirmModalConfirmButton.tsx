"use client";

import { Button } from "@/ui/Button";

interface ConfirmModalProps {
  label: string;
  onConfirm: () => void;
  isPending?: boolean;
  "data-test"?: string;
}

export function ConfirmModalConfirmButton({
  onConfirm,
  ...props
}: ConfirmModalProps) {
  const handlePress = () => onConfirm();

  return (
    <Button
      variant="contrast"
      onPress={handlePress}
      size="medium"
      className="py-2"
      {...props}
    />
  );
}
