"use client";

import { startTransition } from "react";
import { useDeleteProject } from "../DeleteProjectContext";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { BaseDeleteProjectModal } from "../BaseDeleteProjectModal";
import { useModal } from "@/common/ModalManagerContext";

interface DeleteProjectModalProps {
  projectId: number;
  projectTitle: string;
}

export function DeleteProjectModal({
  projectId,
  projectTitle,
}: DeleteProjectModalProps) {
  const { action } = useDeleteProject();
  const { isOpen, onOpenChange } = useModal("deleteProject");
  const { remove: removeSelected } = useSelectedProjects();

  function handleDelete() {
    const payload = {
      id: projectId,
      shouldRedirect: false,
    };

    //Remove the entity from the selection to prevent access to it
    removeSelected(projectId);

    //close modal before deleting
    onOpenChange(false);

    startTransition(() => action(payload));
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
