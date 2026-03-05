"use client";

import { tv } from "tailwind-variants";
import { CirclePlus } from "lucide-react";
import { linkStyles } from "@/components/ui/Link";
import { Button, ButtonProps } from "react-aria-components";

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
  ...props
}: EmptySectionButtonProps) {
  return (
    <Button
      {...props}
      className={(renderProps) =>
        styles({ ...renderProps, variant: "primary" })
      }
    >
      <CirclePlus size={16} strokeWidth={1.5} absoluteStrokeWidth />
      {children}
    </Button>
  );
}
