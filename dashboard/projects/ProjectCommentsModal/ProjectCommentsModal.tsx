"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { EntityCommentsModal } from "@/dashboard/comments/EntityCommentsModal";

interface ProjectCommentsModalProps {
  projectCommentsContainer: React.ReactNode;
}

export function ProjectCommentsModal({
  projectCommentsContainer,
}: ProjectCommentsModalProps) {
  const t = useTranslations("dashboard.projects.ProjectCommentsModal");

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
