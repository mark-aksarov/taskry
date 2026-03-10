"use client";

import { tv } from "tailwind-variants";
import { CirclePlus } from "lucide-react";
import { linkStyles } from "@/components/ui/Link";
import { useGuestModeModal } from "../GuestModeModal";
import { useCurrentUser } from "../CurrentUserContext";
import { Button, ButtonProps, PressEvent } from "react-aria-components";

interface EmptySectionButtonProps extends ButtonProps {
  children: React.ReactNode;
  "data-test"?: string;
}

const styles = tv({
  extend: linkStyles,
  base: "gap-2 text-sm font-bold",
});

export function EmptySectionButton({
  children,
  onPress,
  ...props
}: EmptySectionButtonProps) {
  const { isGuest } = useCurrentUser();
  const { onOpenChange } = useGuestModeModal();

  function handlePress(e: PressEvent) {
    if (isGuest) {
      onOpenChange(true);
      return;
    }

    onPress?.(e);
  }

  return (
    <Button
      {...props}
      onPress={handlePress}
      className={(renderProps) =>
        styles({ ...renderProps, variant: "primary" })
      }
    >
      <CirclePlus size={16} strokeWidth={1.5} absoluteStrokeWidth />
      {children}
    </Button>
  );
}
