import clsx from "clsx";
import React, { useContext } from "react";
import { X } from "lucide-react";
import { Button } from "../Button";
import {
  Dialog as RACDialog,
  DialogProps as RACDialogProps,
  Heading,
  OverlayTriggerStateContext,
} from "react-aria-components";

export const Dialog = ({ children, className, ...props }: RACDialogProps) => {
  return (
    <RACDialog
      className={clsx("flex h-full flex-col outline-none", className)}
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
  const { close } = useContext(OverlayTriggerStateContext)!;

  const classes = clsx(
    className,
    "flex items-center justify-between border-b-1 border-gray-300 dark:border-gray-600 px-5 py-4",
  );

  return (
    <div className={classes} {...props}>
      <Heading slot="title" className="text-lg font-bold">
        {children}
      </Heading>
      <Button
        variant="ghost"
        iconLeft={<X size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        onClick={close}
        className="-mr-2 rounded-full!"
        aria-label="Close"
      />
    </div>
  );
};

export const DialogBody = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) => {
  const classes = clsx(className, "h-full shrink-1 overflow-auto p-5");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
