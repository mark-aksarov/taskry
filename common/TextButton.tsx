"use client";

import { textButtonStyles } from "./styles";
import { Button, ButtonProps, composeRenderProps } from "react-aria-components";

export function TextButton({ children, className, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        textButtonStyles({ ...renderProps, className }),
      )}
    >
      {children}
    </Button>
  );
}
