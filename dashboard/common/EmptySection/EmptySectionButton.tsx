"use client";

import { tv } from "tailwind-variants";
import { CirclePlus } from "lucide-react";
import { linkStyles } from "@/ui/Link";
import { Button, ButtonProps, PressEvent } from "react-aria-components";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";

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
  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  function handlePress(e: PressEvent) {
    guestGuard(() => {
      onPress?.(e);
    });
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
