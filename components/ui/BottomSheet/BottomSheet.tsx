"use client";

import React, { useMemo } from "react";
import { mergeRefs } from "@react-aria/utils";
import { OverlayTriggerState } from "react-stately";
import { AnimatePresence, motion } from "motion/react";
import { OverlayTriggerStateContext } from "react-aria-components";
import { AriaModalOverlayProps, Overlay, useModalOverlay } from "react-aria";
import { twMerge } from "tailwind-merge";

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

  return (
    <OverlayTriggerStateContext.Provider value={state}>
      <Overlay>
        <div
          data-testid="overlay"
          {...underlayProps}
          className="fixed inset-0 z-10 bg-black/20"
        >
          <div
            {...modalProps}
            ref={mergedRefs}
            className={twMerge(
              "absolute bottom-0 left-0 w-full overflow-hidden rounded-t-2xl bg-white shadow-lg will-change-transform dark:bg-gray-800",
              className,
            )}
            data-testid="bottom-sheet"
          >
            {children}
          </div>
        </div>
      </Overlay>
    </OverlayTriggerStateContext.Provider>
  );
};

const MotionBottomSheet = motion.create(BottomSheetInner);
