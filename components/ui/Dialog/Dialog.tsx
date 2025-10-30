"use client";

import React, { useContext } from "react";
import { X } from "lucide-react";
import { Button } from "../Button";
import {
  Dialog as RACDialog,
  DialogProps as RACDialogProps,
  Heading,
  OverlayTriggerStateContext,
  PressEvent,
  HeadingProps,
} from "react-aria-components";
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

export const DialogHeader = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<"div">) => {
  const classes = twMerge(
    "flex items-center justify-between border-b-1 border-gray-300 dark:border-gray-600 px-5 py-4",
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
        "text-lg font-bold text-black dark:text-white",
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
  const classes = twMerge("h-full shrink-1 overflow-auto p-5", className);

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
    "flex items-center justify-between border-t-1 border-gray-300 dark:border-gray-600 px-5 py-3",
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
}

export const DialogCloseButton = ({
  iconSize = 16,
  onPress,
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
      className="-mr-2 rounded-full hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-600 dark:active:bg-gray-700"
      aria-label="Close"
    />
  );
};
