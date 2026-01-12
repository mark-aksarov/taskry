"use client";

import { tv } from "tailwind-variants";
import { CheckCheck } from "lucide-react";
import { RACButtonProps, linkStyles, RACButton } from "@/components/ui";

const styles = tv({
  extend: linkStyles,
  base: "gap-2 text-sm font-bold",
});

export function MarkAllAsReadButton(props: RACButtonProps) {
  return (
    <RACButton
      {...props}
      className={(renderProps) =>
        styles({ ...renderProps, variant: "primary" })
      }
      data-test="empty-section-button"
    >
      <CheckCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />
      Mark all as read
    </RACButton>
  );
}
