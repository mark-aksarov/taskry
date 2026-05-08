"use client";

import { tv } from "tailwind-variants";
import React, { useMemo } from "react";
import { mergeRefs } from "@react-aria/utils";
import { OverlayTriggerState } from "react-stately";
import { AnimatePresence, motion } from "motion/react";
import { OverlayTriggerStateContext } from "react-aria-components";
import { AriaModalOverlayProps, Overlay, useModalOverlay } from "react-aria";

const styles = tv({
  slots: {
    overlay: "fixed inset-0 z-4 bg-(--overlay-surface)",
    modal: "absolute bottom-0 left-0 w-full will-change-transform",
    content: [
      "h-full",
      "overflow-hidden",
      "rounded-t-2xl",
      "border-(--border-primary)",
      "bg-(--surface-primary)",
    ],
  },
});

export type BottomSheetOwnProps = {
  state: OverlayTriggerState;
  className?: string;
  children: React.ReactNode;
};

export type BottomSheetProps = AriaModalOverlayProps &
  BottomSheetOwnProps &
  React.RefAttributes<HTMLDivElement>;

const motionVariants = {
  hidden: { translateY: "100%" },
  visible: { translateY: 0 },
};

export const BottomSheet = ({ state, ...props }: BottomSheetProps) => {
  return (
    <AnimatePresence>
      {state.isOpen && (
        <MotionBottomSheet
          variants={motionVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.15 }}
          state={state}
          {...props}
        />
      )}
    </AnimatePresence>
  );
};

const BottomSheetInner = ({
  state,
  className,
  children,
  ref,
  ...props
}: BottomSheetProps) => {
  const innerRef = React.useRef(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, innerRef);
  const mergedRefs = useMemo(() => mergeRefs(ref, innerRef), [ref, innerRef]);
  const { overlay, modal, content } = styles();

  return (
    <OverlayTriggerStateContext.Provider value={state}>
      <Overlay>
        <div data-testid="overlay" {...underlayProps} className={overlay()}>
          <div
            {...modalProps}
            ref={mergedRefs}
            className={modal()}
            data-testid="bottom-sheet"
          >
            <div className={content({ className })}>{children}</div>
          </div>
        </div>
      </Overlay>
    </OverlayTriggerStateContext.Provider>
  );
};

const MotionBottomSheet = motion.create(BottomSheetInner);
