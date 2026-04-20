"use client";

import { tv } from "tailwind-variants";
import { focusRing } from "@/ui/styles";
import { Button, ButtonProps } from "react-aria-components";

export interface ItemBaseDetailButtonProps extends ButtonProps {
  children: React.ReactNode;
  "data-test"?: string;
  className?: string;
}

const styles = tv({
  extend: focusRing,
  base: "cursor-pointer",
});

export function ItemBaseDetailButton({
  children,
  className,
  ...props
}: ItemBaseDetailButtonProps) {
  return (
    <Button
      className={(renderProps) =>
        styles({
          ...renderProps,
          className,
        })
      }
      {...props}
    >
      {children}
    </Button>
  );
}
