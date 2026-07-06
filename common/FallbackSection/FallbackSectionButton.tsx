"use client";

import { CirclePlus } from "lucide-react";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { ButtonProps, PressEvent } from "react-aria-components";
import { TextButton } from "@/common/TextButton";

interface FallbackSectionButtonProps extends ButtonProps {
  children: React.ReactNode;
  "data-test"?: string;
}

export function FallbackSectionButton({
  children,
  onPress,
  ...props
}: FallbackSectionButtonProps) {
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
