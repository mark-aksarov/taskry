import React from "react";
import {
  Modal as RACModal,
  ModalOverlayProps,
  ModalOverlay,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { overlayStyles } from "../styles";

export type ModalProps = ModalOverlayProps &
  React.RefAttributes<HTMLDivElement>;

const modalStyles = tv({
  base: "w-[490px] overflow-hidden rounded-xl border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800",
  variants: {
    isEntering: {
      true: "",
    },
    isExiting: {
      true: "",
    },
  },
});

export const Modal = ({ children, className, ...props }: ModalProps) => {
  return (
    <ModalOverlay {...props} className={overlayStyles}>
      <RACModal
        className={composeRenderProps(className, (className, renderProps) =>
          modalStyles({ ...renderProps, className }),
        )}
      >
        {children}
      </RACModal>
    </ModalOverlay>
  );
};
