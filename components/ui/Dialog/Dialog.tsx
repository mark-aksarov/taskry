"use client";

import {
  Heading,
  PressEvent,
  HeadingProps,
  Dialog as RACDialog,
  OverlayTriggerStateContext,
  DialogProps as RACDialogProps,
} from "react-aria-components";

import { X } from "lucide-react";
import { Button } from "../Button";
import { twMerge } from "tailwind-merge";
import React, { useContext } from "react";

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

export const DialogHeading = ({
  className,
  children,
  ...props
}: HeadingProps) => {
  return (
    <Heading
      slot="title"
      className={twMerge(
        "font-bold text-black max-md:text-base md:text-lg dark:text-white",
        className,
      )}
      {...props}
    >
      {children}
    </Heading>
  );
};

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

interface DialogCloseButtonProps {
  iconSize?: number;
  onPress?: (e: PressEvent) => void;
  className?: string;
}

export const DialogCloseButton = ({
  iconSize = 18,
  onPress,
  className,
}: DialogCloseButtonProps) => {
  const state = useContext(OverlayTriggerStateContext);

  function handlePress(e: PressEvent) {
    if (state) state.close();
    onPress?.(e);
  }

  return (
    <Button
      variant="ghost"
      iconLeft={<X size={iconSize} strokeWidth={1.5} absoluteStrokeWidth />}
      onPress={handlePress}
      className={twMerge("-mr-2 rounded-full", className)}
      aria-label="Close"
    />
  );
};
