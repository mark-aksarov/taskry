"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useDeleteProject } from "../DeleteProjectContext";
import { useModal } from "@/components/common/ModalManagerContext";
import { useUpdateProjectTitle } from "../UpdateProjectTitleContext";

interface ProjectTitleDetailInfoAltProps {
  title: string;
}

export function ProjectTitleDetailInfoAlt({
  title,
}: ProjectTitleDetailInfoAltProps) {
  const t = useTranslations("projects.ProjectDetail");

  const { onOpenChange: onUpdateTitleModalOpenChange } =
    useModal("updateProjectTitle");

  //Disable edit button while the project is being deleted
  const { isPending: isDeleteProjectPending } = useDeleteProject();

  //Pending state while updating project title
  const { isPending: isUpdateProjectTitlePending } = useUpdateProjectTitle();

  return (
    <DetailInfoAlt
      data-test="project-title-detail-info"
      title={<DetailTitle>{t("title")}</DetailTitle>}
      content={<DetailText>{title}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-project-title-edit-button"
          isPending={isUpdateProjectTitlePending}
          isDisabled={isDeleteProjectPending}
          onPress={() => onUpdateTitleModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
