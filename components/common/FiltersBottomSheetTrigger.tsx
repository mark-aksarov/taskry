"use client";

import {
  Button,
  BottomSheet,
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
} from "@/components/ui";
import { useRef } from "react";
import { useOverlayTrigger } from "react-aria";
import { SlidersHorizontal } from "lucide-react";
import { useOverlayTriggerState } from "react-stately";

export function FiltersBottomSheetTrigger({
  filtersForm,
}: {
  filtersForm: React.ReactNode;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <>
      <Button
        {...triggerProps}
        ref={triggerRef}
        aria-label="filters"
        variant="outlined"
        iconLeft={
          <SlidersHorizontal size={16} strokeWidth={1.5} absoluteStrokeWidth />
        }
      />

      <BottomSheet isDismissable state={state} className="md:hidden">
        <Dialog
          aria-label="App navigation"
          className="max-h-[calc(100dvh-64px)]"
        >
          <DialogHeader>
            <DialogHeading className="text-base">Filters</DialogHeading>
            <DialogCloseButton />
          </DialogHeader>
          <DialogBody>{filtersForm}</DialogBody>
        </Dialog>
      </BottomSheet>
    </>
  );
}
