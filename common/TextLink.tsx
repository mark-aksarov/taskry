"use client";

import { textButtonStyles } from "./styles";
import { Link, LinkProps, composeRenderProps } from "react-aria-components";

export function TextLink({ children, className, ...props }: LinkProps) {
  return (
    <Link
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        textButtonStyles({ ...renderProps, className }),
      )}
    >
      {children}
    </Link>
  );
}
