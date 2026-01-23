"use client";

import { useRef } from "react";
import { useOverlayTrigger } from "react-aria";
import { NewSubtaskDialog } from "../NewSubtaskDialog";
import { useOverlayTriggerState } from "react-stately";
import { NewSubtasksButton } from "../NewSubtaskButton";
import { Modal, RACDialogTrigger } from "@/components/ui";

export function NewSubtaskModalTrigger() {
  const state = useOverlayTriggerState({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { triggerProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef,
  );

  return (
    <RACDialogTrigger>
      <NewSubtasksButton
        {...triggerProps}
        ref={triggerRef}
        className="max-md:hidden"
      />
      <Modal isDismissable className="w-[300px]">
        <NewSubtaskDialog />
      </Modal>
    </RACDialogTrigger>
  );
}
