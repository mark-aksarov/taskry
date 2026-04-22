"use client";

import {
  Dialog as RACDialog,
  DialogProps as RACDialogProps,
} from "react-aria-components";

import React from "react";
import { twMerge } from "tailwind-merge";

export const Dialog = ({ children, className, ...props }: RACDialogProps) => {
  return (
    <RACDialog
      className={twMerge("flex h-full flex-col outline-none", className)}
      {...props}
    >
      {children}
    </RACDialog>
  );
};
