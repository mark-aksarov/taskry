"use client";

import {
  ModalOverlay,
  Modal as RACModal,
  ModalOverlayProps,
  composeRenderProps,
} from "react-aria-components";

import React from "react";
import { tv } from "tailwind-variants";
import { overlayStyles } from "../styles";

interface ModalOwnProps {
  fullscreen?: boolean;
}

export type ModalProps = ModalOwnProps &
  ModalOverlayProps &
  React.RefAttributes<HTMLDivElement>;

const modalStyles = tv({
  base: [
    "w-[490px]",
    "overflow-hidden",
    "rounded-xl border border-(--border-primary)",
    "bg-white dark:bg-gray-800",
    "transition duration-150",
  ],
  variants: {
    isEntering: {
      true: "scale-95 opacity-0",
    },
    isExiting: {
      true: "scale-95 opacity-0",
    },
    fullscreen: {
      true: "h-[100dvh] w-screen rounded-none border-none",
    },
  },
});

export const Modal = ({
  fullscreen = false,
  children,
  className,
  ...props
}: ModalProps) => {
  return (
    <ModalOverlay
      {...props}
      className={(renderProps) =>
        overlayStyles({
          ...renderProps,
          className: fullscreen ? "bg-transparent" : null,
        })
      }
    >
      <RACModal
        className={composeRenderProps(className, (className, renderProps) =>
          modalStyles({ ...renderProps, className, fullscreen }),
        )}
      >
        {children}
      </RACModal>
    </ModalOverlay>
  );
};
