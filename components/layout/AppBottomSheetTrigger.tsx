"use client";

import { useRef } from "react";
import { Menu } from "lucide-react";
import { useOverlayTrigger } from "react-aria";
import { Button } from "@/components/ui/Button";
import { BottomSheet } from "../ui/BottomSheet";
import { AppNavigation } from "./AppNavigation";
import { Dialog, DialogBody } from "../ui/Dialog";
import { useOverlayTriggerState } from "react-stately";

export function AppBottomSheetTrigger() {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <>
      <Button
        {...triggerProps}
        ref={triggerRef}
        aria-label="language"
        variant="ghost"
        iconLeft={<Menu size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        className="rounded-full p-3"
      />

      <BottomSheet isDismissable state={state}>
        <Dialog
          aria-label="App navigation"
          className="max-h-[calc(100dvh-64px)]"
        >
          <DialogBody className="px-3 py-4">
            <AppNavigation />
          </DialogBody>
        </Dialog>
      </BottomSheet>
    </>
  );
}
