"use client";

import { twMerge } from "tailwind-merge";

export const DialogHeader = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<"div">) => {
  const classes = twMerge(
    "flex items-center justify-between border-b-1 border-gray-300 dark:border-gray-600 md:px-5 md:py-4 max-md:px-4 max-md:py-3",
    className,
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
