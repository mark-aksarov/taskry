"use client";

import { useTranslations } from "next-intl";
import { useModal } from "../common/ModalManagerContext";
import { EmptySectionButton } from "@/dashboard/common/EmptySection";

export function ProjectsEmptySectionCreateButton() {
  const t = useTranslations(
    "dashboard.projects.ProjectsEmptySectionCreateButton",
  );

  const { onOpenChange: onCreateProjectModalOpenChange } =
    useModal(`createProject`);

  return (
    <EmptySectionButton
      data-test="projects-empty-section-create-button"
      onPress={() => onCreateProjectModalOpenChange(true)}
    >
      {t("label")}
    </EmptySectionButton>
  );
}
