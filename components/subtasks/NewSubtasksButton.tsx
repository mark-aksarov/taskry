"use client";

import { RACButton, RACButtonProps } from "../ui";
import { tv } from "tailwind-variants";
import { composeRenderProps } from "react-aria-components";
import { Plus } from "lucide-react";
import { linkStyles } from "../ui";

const styles = tv({
  extend: linkStyles,
  base: "text-sm font-semibold",
});

export function NewSubtasksButton({ className, ...props }: RACButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, variant: "primary", className }),
      )}
    >
      <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
      New Subtask
    </RACButton>
  );
}
