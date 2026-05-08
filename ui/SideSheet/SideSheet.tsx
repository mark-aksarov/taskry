"use client";

import React from "react";
import {
  Modal as RACModal,
  ModalOverlayProps,
  ModalOverlay,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { overlayStyles } from "../styles";

export type SideSheetSide = "left" | "right";

export type SideSheetProps = ModalOverlayProps &
  React.RefAttributes<HTMLDivElement> & {
    side?: SideSheetSide;
  };

const sideSheetStyles = tv({
  base: [
    "h-full",
    "overflow-hidden",
    "border-(--border-primary)",
    "bg-(--surface-primary)",
    "transition duration-150",
  ],
  variants: {
    side: {
      left: "",
      right: "",
    },
    isEntering: {
      true: "",
    },
    isExiting: {
      true: "",
    },
  },
  compoundVariants: [
    {
      isEntering: true,
      side: "left",
      className: "-translate-x-full",
    },
    {
      isExiting: true,
      side: "left",
      className: "-translate-x-full",
    },

    {
      isEntering: true,
      side: "right",
      className: "translate-x-full",
    },
    {
      isExiting: true,
      side: "right",
      className: "translate-x-full",
    },
  ],
});

const sideSheetOverlayStyles = tv({
  extend: overlayStyles,
  variants: {
    side: {
      left: "justify-start",
      right: "justify-end",
    },
  },
});

export const SideSheet = ({
  children,
  className,
  side = "right",
  ...props
}: SideSheetProps) => {
  return (
    <ModalOverlay
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        sideSheetOverlayStyles({ ...renderProps, className, side }),
      )}
    >
      <RACModal
        className={composeRenderProps(className, (className, renderProps) =>
          sideSheetStyles({
            side,
            ...renderProps,
            className,
          }),
        )}
      >
        {children}
      </RACModal>
    </ModalOverlay>
  );
};
