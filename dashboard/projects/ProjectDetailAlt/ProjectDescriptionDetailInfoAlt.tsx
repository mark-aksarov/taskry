"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { useDeleteProject } from "../DeleteProjectContext";
import { useUpdateProjectDescription } from "../UpdateProjectDescriptionContext";

interface ProjectDescriptionDetailInfoAltProps {
  description?: string;
}

export function ProjectDescriptionDetailInfoAlt({
  description,
}: ProjectDescriptionDetailInfoAltProps) {
  const t = useTranslations("dashboard.projects.ProjectDetail");

  //Disable edit button while the project is being deleted
  const { isPending: isDeleteProjectPending } = useDeleteProject();

  //Pending state while updating project description
  const { onOpenChange: onUpdateDescriptionModalOpenChange } = useModal(
    "updateProjectDescription",
  );

  const { isPending: isUpdateProjectDescriptionPending } =
    useUpdateProjectDescription();

  const handlePress = () => {
    onUpdateDescriptionModalOpenChange(true);
  };

  return (
    <DetailInfoAlt
      data-test="project-description-detail-info"
      title={<DetailTitle>{t("description")}</DetailTitle>}
      content={
        <DetailText>
          {description ? description : t("noDescription")}
        </DetailText>
      }
      rightSlot={
        <DetailEditButton
          aria-label={t("editDescriptionButtonLabel")}
          data-test="edit-description-button"
          isPending={isUpdateProjectDescriptionPending}
          isDisabled={isDeleteProjectPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
