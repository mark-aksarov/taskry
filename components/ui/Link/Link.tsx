"use client";

import {
  composeRenderProps,
  LinkProps,
  Link as ReactAriaLink,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "../styles";

export const linkStyles = tv({
  extend: focusRing,
  base: "cursor-pointer text-sm font-bold text-blue-600 hover:text-blue-500 active:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 dark:active:text-blue-600",
});

export const Link = ({
  className,
  ...props
}: LinkProps & React.RefAttributes<HTMLAnchorElement>) => {
  const classes = composeRenderProps(className, (className, renderProps) =>
    linkStyles({ ...renderProps, className }),
  );

  return <ReactAriaLink {...props} className={classes} />;
};
