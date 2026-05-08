"use client";

import React, { useMemo } from "react";
import { mergeRefs } from "@react-aria/utils";
import type { AriaPopoverProps } from "react-aria";
import { AnimatePresence, motion } from "motion/react";
import type { OverlayTriggerState } from "react-stately";
import { DismissButton, Overlay, usePopover } from "react-aria";
import { twMerge } from "tailwind-merge";

export type Placement =
  | "left top"
  | "left bottom"
  | "bottom"
  | "bottom left"
  | "bottom right";

interface PopoverOwnProps {
  children: React.ReactNode;
  state: OverlayTriggerState;
  className?: string;
  style?: React.CSSProperties;
  placement?: Placement;
}

type PopoverProps = Omit<AriaPopoverProps, "popoverRef" | "placement"> &
  React.RefAttributes<HTMLDivElement> &
  PopoverOwnProps;

const motionVariants = {
  left: {
    hidden: {
      opacity: 0,
      translateX: 5,
    },
    visible: {
      opacity: 1,
      translateX: 0,
    },
  },
  bottom: {
    hidden: {
      opacity: 0,
      translateY: -5,
    },
    visible: {
      opacity: 1,
      translateY: 0,
    },
  },
};

export const Popover = ({ state, ...props }: PopoverProps) => {
  return (
    <AnimatePresence custom={props.placement}>
      {state.isOpen && (
        <MotionPopover
          variants={
            props.placement === "left top" || props.placement === "left bottom"
              ? motionVariants.left
              : motionVariants.bottom
          }
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.1 }}
          state={state}
          {...props}
        />
      )}
    </AnimatePresence>
  );
};

const PopoverInner = ({
  children,
  state,
  className,
  style,
  ref,
  ...props
}: PopoverProps) => {
  const popoverRef = React.useRef(null);
  const mergedRefs = useMemo(
    () => mergeRefs(popoverRef, ref),
    [popoverRef, ref],
  );
  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      offset: 8,
      popoverRef,
    },
    state,
  );

  return (
    <Overlay>
      <div {...underlayProps} style={{ position: "fixed", inset: 0 }} />
      <div
        {...popoverProps}
        ref={mergedRefs}
        style={{
          ...popoverProps.style,
          ...style,
        }}
        className={twMerge(
          "overflow-hidden rounded-xl border border-(--border-primary) bg-(--surface-primary) shadow-lg will-change-transform",
          className,
        )}
        data-testid="popover"
      >
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
};

const MotionPopover = motion.create(PopoverInner);
