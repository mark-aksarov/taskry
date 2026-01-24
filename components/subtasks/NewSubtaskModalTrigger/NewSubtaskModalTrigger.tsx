"use client";

import { useRef } from "react";
import { Modal } from "@/components/ui/Modal";
import { useOverlayTrigger } from "react-aria";
import { DialogTrigger } from "react-aria-components";
import { NewSubtaskDialog } from "../NewSubtaskDialog";
import { useOverlayTriggerState } from "react-stately";
import { NewSubtasksButton } from "../NewSubtaskButton";

export function NewSubtaskModalTrigger() {
  const state = useOverlayTriggerState({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { triggerProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef,
  );

  return (
    <DialogTrigger>
      <NewSubtasksButton
        {...triggerProps}
        ref={triggerRef}
        className="max-md:hidden"
      />
      <Modal isDismissable className="w-[300px]">
        <NewSubtaskDialog />
      </Modal>
    </DialogTrigger>
  );
}
