"use client";

import { useTranslations } from "next-intl";
import { useModal } from "../../common/ModalManagerContext";
import { FallbackSectionButton } from "@/common/FallbackSection";

export function ProjectsEmptySectionCreateButton() {
  const t = useTranslations(
    "dashboard.projects.ProjectsEmptySectionCreateButton",
  );

  const { onOpenChange: onCreateProjectModalOpenChange } =
    useModal(`createProject`);

  return (
    <FallbackSectionButton
      data-test="projects-empty-section-create-button"
      onPress={() => onCreateProjectModalOpenChange(true)}
    >
      {t("label")}
    </FallbackSectionButton>
  );
}
