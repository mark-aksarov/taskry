"use client";

import { useRef } from "react";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { NewSubtaskDialog } from "../NewSubtaskDialog";
import { NewSubtasksButton } from "../NewSubtaskButton";
import { BottomSheet } from "@/components/ui/BottomSheet";

export function NewSubtaskBottomSheetTrigger() {
  const state = useOverlayTriggerState({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { triggerProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef,
  );

  return (
    <>
      <NewSubtasksButton
        {...triggerProps}
        ref={triggerRef}
        className="md:hidden"
      />
      <BottomSheet isDismissable state={state}>
        <NewSubtaskDialog />
      </BottomSheet>
    </>
  );
}
