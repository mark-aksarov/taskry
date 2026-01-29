"use client";

import { useRef } from "react";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { NewSubtasksButton } from "../NewSubtaskButton";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { NewSubtaskFormDialog } from "../NewSubtaskFormDialog";

interface NewSubtaskBottomSheetTriggerProps {
  newSubtaskFormContainer: React.ReactNode;
}

export function NewSubtaskBottomSheetTrigger({
  newSubtaskFormContainer,
}: NewSubtaskBottomSheetTriggerProps) {
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
        <NewSubtaskFormDialog>{newSubtaskFormContainer}</NewSubtaskFormDialog>
      </BottomSheet>
    </>
  );
}
