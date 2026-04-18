"use client";

import { useTranslations } from "next-intl";
import { useDeleteProject } from "./DeleteProjectContext";
import { useModal } from "../common/ModalManagerContext";
import { DetailsDeleteButton } from "../common/DetailsDeleteButton";

export function DeleteProjectModalTrigger() {
  const t = useTranslations("projects.DeleteProjectModalTrigger");

  const { onOpenChange: onDeleteProjectModalOpenChange } =
    useModal("deleteProject");
  const { isPending } = useDeleteProject();

  return (
    <DetailsDeleteButton
      isPending={isPending}
      data-test="delete-project-modal-trigger"
      aria-label={t("label")}
      onPress={() => onDeleteProjectModalOpenChange(true)}
    />
  );
}
