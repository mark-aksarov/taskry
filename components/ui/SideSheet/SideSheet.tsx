import React from "react";
import {
  Modal as RACModal,
  ModalOverlayProps,
  ModalOverlay,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import clsx from "clsx";
import { overlayStyles } from "../styles";

export type SideSheetProps = ModalOverlayProps &
  React.RefAttributes<HTMLDivElement>;

const sideSheetStyles = tv({
  base: "h-full w-[355px] overflow-hidden border-l-1 border-gray-300 bg-white transition duration-150 dark:border-gray-600 dark:bg-gray-800",
  variants: {
    isEntering: {
      true: "translate-x-full",
    },
    isExiting: {
      true: "translate-x-full",
    },
  },
});

const sideSheetOverlayStyles = tv({
  extend: overlayStyles,
  base: "justify-end",
});

export const SideSheet = ({
  children,
  className,
  ...props
}: SideSheetProps) => {
  return (
    <ModalOverlay {...props} className={sideSheetOverlayStyles}>
      <RACModal
        className={composeRenderProps(className, (className, renderProps) =>
          clsx(
            sideSheetStyles({
              ...renderProps,
              className,
            }),
          ),
        )}
      >
        {children}
      </RACModal>
    </ModalOverlay>
  );
};
