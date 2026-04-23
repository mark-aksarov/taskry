"use client";

import { CirclePlus } from "lucide-react";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { ButtonProps, PressEvent } from "react-aria-components";
import { TextButton } from "@/common/TextButton";

interface EmptySectionButtonProps extends ButtonProps {
  children: React.ReactNode;
  "data-test"?: string;
}

export function EmptySectionButton({
  children,
  onPress,
  ...props
}: EmptySectionButtonProps) {
  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  function handlePress(e: PressEvent) {
    guestGuard(() => {
      onPress?.(e);
    });
  }

  return (
    <TextButton {...props} onPress={handlePress} className="font-bold">
      <CirclePlus size={16} strokeWidth={1.5} absoluteStrokeWidth />
      {children}
    </TextButton>
  );
}
