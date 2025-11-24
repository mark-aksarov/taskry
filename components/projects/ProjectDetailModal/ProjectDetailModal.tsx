"use client";

import {
  Modal,
  Dialog,
  Button,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";

import { Suspense, useContext } from "react";
import { ProjectDetailCompactClientContainerContext } from "../ProjectDetailCompactClientContainer";
import { ProjectDetailCompactSkeleton } from "../ProjectDetailCompact/ProjectDetailCompactSkeleton";

export function ProjectDetailModal({ projectId }: { projectId: number }) {
  const ProjectDetailContainer = useContext(
    ProjectDetailCompactClientContainerContext,
  );

  return (
    <Modal isDismissable className="w-[600px]">
      <Dialog className="max-h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>Project Details</DialogHeading>
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
    </Modal>
  );
}
