"use client";

import { RACButton, RACButtonProps } from "../ui";
import { tv } from "tailwind-variants";
import { composeRenderProps } from "react-aria-components";
import { SquarePen } from "lucide-react";
import { linkStyles } from "../ui";

const styles = tv({
  extend: linkStyles,
  base: "text-xs font-bold",
});

export function UpdateSubtasksButton({ className, ...props }: RACButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, variant: "primary", className }),
      )}
    >
      <SquarePen size={16} strokeWidth={1.5} absoluteStrokeWidth />
      Update subtasks
    </RACButton>
  );
}
