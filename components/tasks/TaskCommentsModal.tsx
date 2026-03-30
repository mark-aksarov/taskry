"use client";

import { useTranslations } from "next-intl";
import { useModal } from "../common/ModalManagerContext";
import { EntityCommentsModal } from "../comments/EntityCommentsModal";

interface TaskCommentsModalProps {
  taskCommentsContainer: React.ReactNode;
}

export function TaskCommentsModal({
  taskCommentsContainer,
}: TaskCommentsModalProps) {
  const t = useTranslations("tasks.TaskCommentsModal");
  const { isOpen, onOpenChange } = useModal("taskComments");

  return (
    <EntityCommentsModal
      title={t("title")}
      commentsContainer={taskCommentsContainer}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    />
  );
}
