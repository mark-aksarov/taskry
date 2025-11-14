"use client";

import {
  Button,
  BottomSheet,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
} from "@/components/ui";
import { useRef } from "react";
import { useOverlayTrigger } from "react-aria";
import { SlidersHorizontal } from "lucide-react";
import { useOverlayTriggerState } from "react-stately";

export function TaskFiltersBottomSheetTrigger({
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
        aria-label="task filters"
        variant="outlined"
        iconLeft={
          <SlidersHorizontal size={16} strokeWidth={1.5} absoluteStrokeWidth />
        }
      />

      <BottomSheet isDismissable state={state} className="md:hidden">
        <Dialog className="max-h-[calc(100dvh-6.25rem)]">
          <DialogHeader>
            <DialogHeading className="text-base">Task Filters</DialogHeading>
            <DialogCloseButton />
          </DialogHeader>
          <DialogBody>{filtersForm}</DialogBody>
          <DialogFooter>
            <Button
              variant="primary"
              size="medium"
              label="Apply Filters"
              className="w-full justify-center"
            />
          </DialogFooter>
        </Dialog>
      </BottomSheet>
    </>
  );
}
