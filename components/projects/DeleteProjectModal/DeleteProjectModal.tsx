"use client";

import { useDeleteProject } from "../DeleteProjectContext";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { BaseDeleteProjectModal } from "./BaseDeleteProjectModal";
import { handleDeleteEntity } from "@/lib/utils/handleDeleteEntity";

interface DeleteProjectModalProps {
  projectId: number;
  projectTitle: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function DeleteProjectModal({
  projectId,
  projectTitle,
  isOpen,
  onOpenChange,
}: DeleteProjectModalProps) {
  const { action } = useDeleteProject();

  const { remove: removeSelected } = useSelectedProjects();

  function handleDelete() {
    const payload = {
      ids: [projectId],
      shouldRedirect: false,
    };

    handleDeleteEntity(
      removeSelected,
      action,
      payload,
      projectId,
      onOpenChange,
    );
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
