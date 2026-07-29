"use client";

import { Button, ButtonProps } from "@/ui/Button";

interface ConfirmModalProps
  extends Pick<ButtonProps, "label" | "isPending" | "variant"> {
  onConfirm?: () => void;
  "data-test"?: string;
}

export function ConfirmModalConfirmButton({
  onConfirm,
  variant = "contrast",
  ...props
}: ConfirmModalProps) {
  const handlePress = () => onConfirm?.();

  return (
    <Button
      onPress={handlePress}
      size="medium"
      className="py-2"
      variant={variant}
      {...props}
    />
  );
}
