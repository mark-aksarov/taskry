import { useRef } from "react";
import { Popover } from "@/components/ui";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { NewSubtaskDialog } from "../NewSubtaskDialog";
import { NewSubtasksButton } from "../NewSubtaskButton";
import { OverlayTriggerStateContext } from "react-aria-components";

export function NewSubtaskPopoverTrigger() {
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
        className="max-md:hidden"
      />
      <OverlayTriggerStateContext.Provider value={state}>
        <Popover triggerRef={triggerRef} state={state} placement="bottom left">
          <NewSubtaskDialog />
        </Popover>
      </OverlayTriggerStateContext.Provider>
    </>
  );
}
