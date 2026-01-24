"use client";

import React from "react";
import { tv } from "tailwind-variants";
import { useOverlayTrigger } from "react-aria";
import { focusRing } from "@/components/ui/styles";
import { useOverlayTriggerState } from "react-stately";
import { Button, OverlayTriggerStateContext } from "react-aria-components";

interface ItemBaseDetailBottomSheetTriggerProps {
  children: React.ReactNode;
  bottomSheet: React.ReactNode;
  className?: string;
}

const styles = tv({
  extend: focusRing,
  base: "max-w-full cursor-pointer md:hidden",
});

export function ItemBaseDetailBottomSheetTrigger({
  children,
  bottomSheet,
  className,
}: ItemBaseDetailBottomSheetTriggerProps) {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <OverlayTriggerStateContext.Provider value={state}>
      <Button
        {...triggerProps}
        className={(renderProps) =>
          styles({
            ...renderProps,
            className,
          })
        }
      >
        {children}
      </Button>
      {bottomSheet}
    </OverlayTriggerStateContext.Provider>
  );
}
