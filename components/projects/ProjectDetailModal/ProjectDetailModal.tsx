"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogFooter,
  DialogHeader,
  DialogHeading,
  Modal,
} from "@/components/ui";
import { useProjectDetailContainer } from "@/components/projects/ProjectDetail";

export function ProjectDetailModal({ projectId }: { projectId: number }) {
  const ProjectDetailContainer = useProjectDetailContainer();

  return (
    <Modal isDismissable className="w-[460px]">
      <Dialog className="max-h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>Project Details</DialogHeading>
          <DialogCloseButton iconSize={20} />
        </DialogHeader>
        <DialogBody>
          <ProjectDetailContainer projectId={projectId} />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="primary"
            size="medium"
            label="Edit Project"
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </Modal>
  );
}
