"use client";

import { linkStyles } from "@/ui/Link";
import { Button, ButtonProps, composeRenderProps } from "react-aria-components";

export function TextButton({ children, className, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        linkStyles({ ...renderProps, variant: "primary", className }),
      )}
    >
      {children}
    </Button>
  );
}
