"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { EntityCommentsModal } from "@/components/comments/EntityCommentsModal";

interface ProjectCommentsModalProps {
  projectCommentsContainer: React.ReactNode;
}

export function ProjectCommentsModal({
  projectCommentsContainer,
}: ProjectCommentsModalProps) {
  const t = useTranslations("projects.ProjectCommentsModal");

  const { isOpen, onOpenChange } = useModal("projectComments");

  return (
    <EntityCommentsModal
      title={t("title")}
      commentsContainer={projectCommentsContainer}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    />
  );
}
