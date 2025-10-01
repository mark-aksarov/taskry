import { BottomSheet } from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogBody, DialogHeader } from "@/components/ui/Dialog";
import { SlidersHorizontal } from "lucide-react";
import { Suspense, useRef } from "react";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { ProjectFilters, ProjectFiltersSkeleton } from "./ProjectFilters";

export function ProjectFiltersBottomSheetTrigger() {
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
          <DialogHeader>Filters</DialogHeader>
          <DialogBody>
            <Suspense fallback={<ProjectFiltersSkeleton />}>
              <ProjectFilters />
            </Suspense>
          </DialogBody>
        </Dialog>
      </BottomSheet>
    </>
  );
}
