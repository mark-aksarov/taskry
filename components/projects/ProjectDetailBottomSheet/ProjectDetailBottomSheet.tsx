"use client";

import {
  Button,
  Dialog,
  DialogBody,
  BottomSheet,
  DialogFooter,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";
import { Suspense, useContext } from "react";
import { OverlayTriggerState } from "react-stately";
import { ProjectDetailCompactSkeleton } from "../ProjectDetailCompact";
import { ProjectDetailCompactClientContainerContext } from "../ProjectDetailCompactClientContainer";

export interface ProjectDetailBottomSheetProps {
  projectId: number;
  state: OverlayTriggerState;
}

export function ProjectDetailBottomSheet({
  projectId,
  state,
}: ProjectDetailBottomSheetProps) {
  const ProjectDetailContainer = useContext(
    ProjectDetailCompactClientContainerContext,
  );

  return (
    <BottomSheet isDismissable state={state} className="md:hidden">
      <Dialog className="max-h-[calc(100dvh-6.25rem)]">
        <DialogHeader>
          <DialogHeading>Project Detail</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
        <DialogBody>
          <Suspense fallback={<ProjectDetailCompactSkeleton />}>
            <ProjectDetailContainer projectId={projectId} />
          </Suspense>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="primary"
            size="medium"
            label="Edit"
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </BottomSheet>
  );
}
