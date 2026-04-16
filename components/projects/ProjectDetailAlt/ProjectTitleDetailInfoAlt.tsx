"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useUpdateProjectTitle } from "../UpdateProjectTitleContext";
import { useModal } from "@/components/common/ModalManagerContext";

interface ProjectTitleDetailInfoAltProps {
  title: string;
}

export function ProjectTitleDetailInfoAlt({
  title,
}: ProjectTitleDetailInfoAltProps) {
  const t = useTranslations("projects.ProjectDetail");

  const { onOpenChange: onUpdateTitleModalOpenChange } =
    useModal("updateProjectTitle");

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
          onPress={() => onUpdateTitleModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
