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
import { ProjectDetailCompactClientContainerContext } from "../ProjectDetailCompactClientContainer";
import { ProjectDetailCompactSkeleton } from "../ProjectDetailCompact/ProjectDetailCompactSkeleton";

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
            as="a"
            href={`/projects/${projectId}`}
            variant="primary"
            size="medium"
            label="Open in Full Page"
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </BottomSheet>
  );
}
