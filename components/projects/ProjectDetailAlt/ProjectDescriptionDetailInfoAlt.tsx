"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { useUpdateProjectDescription } from "../UpdateProjectDescriptionContext";

interface ProjectDescriptionDetailInfoAltProps {
  description?: string;
}

export function ProjectDescriptionDetailInfoAlt({
  description,
}: ProjectDescriptionDetailInfoAltProps) {
  const t = useTranslations("projects.ProjectDetail");

  const { onOpenChange: onUpdateDescriptionModalOpenChange } = useModal(
    "updateProjectDescription",
  );

  const { isPending: isUpdateProjectDescriptionPending } =
    useUpdateProjectDescription();

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
          data-test="update-project-description-edit-button"
          isPending={isUpdateProjectDescriptionPending}
          onPress={() => onUpdateDescriptionModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
