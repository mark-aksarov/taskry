"use client";

import { twMerge } from "tailwind-merge";

export const DialogFooter = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<"div">) => {
  const classes = twMerge(
    "flex items-center justify-between border-t-1 border-gray-300 dark:border-gray-600 md:px-5 max-md:px-4 py-3",
    className,
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
