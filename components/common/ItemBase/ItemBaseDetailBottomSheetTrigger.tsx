"use client";

import React from "react";
import { tv } from "tailwind-variants";
import { useOverlayTrigger } from "react-aria";
import { focusRing, RACButton } from "@/components/ui";
import { OverlayTriggerState, useOverlayTriggerState } from "react-stately";

interface ItemBaseDetailBottomSheetTriggerProps {
  children: React.ReactNode;
  renderBottomSheet: (state: OverlayTriggerState) => React.ReactNode;
  className?: string;
}

const styles = tv({
  extend: focusRing,
  base: "max-w-full cursor-pointer md:hidden",
});

export function ItemBaseDetailBottomSheetTrigger({
  children,
  renderBottomSheet,
  className,
}: ItemBaseDetailBottomSheetTriggerProps) {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <>
      <RACButton
        {...triggerProps}
        className={(renderProps) =>
          styles({
            ...renderProps,
            className,
          })
        }
      >
        {children}
      </RACButton>
      {renderBottomSheet(state)}
    </>
  );
}
