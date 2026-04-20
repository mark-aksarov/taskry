"use client";

import { startTransition } from "react";
import { useDeleteProject } from "./DeleteProjectContext";
import { BaseDeleteProjectModal } from "./BaseDeleteProjectModal";
import { useModal } from "@/dashboard/common/ModalManagerContext";

interface DeleteProjectModalProps {
  projectId: number;
  projectTitle: string;
}

export function DeleteProjectDetailModal({
  projectId,
  projectTitle,
}: DeleteProjectModalProps) {
  const { action } = useDeleteProject();
  const { isOpen, onOpenChange } = useModal("deleteProject");

  // Close modal and delete project
  // We should redirect to the project list page after deletion
  function handleDelete() {
    onOpenChange(false);
    startTransition(() => action({ id: projectId, shouldRedirect: true }));
  }

  return (
    <BaseDeleteProjectModal
      onDelete={handleDelete}
      projectTitle={projectTitle}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    />
  );
}
