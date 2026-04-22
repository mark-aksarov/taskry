"use client";

import { twMerge } from "tailwind-merge";

export const DialogBody = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) => {
  const classes = twMerge(
    "flex-auto overflow-auto md:p-5 max-md:p-4",
    className,
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
