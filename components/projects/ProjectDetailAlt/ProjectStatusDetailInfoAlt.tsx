"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useModal } from "@/components/common/ModalManagerContext";
import { useUpdateProjectStatusAlt } from "../UpdateProjectStatusAltContext";

interface ProjectStatusDetailInfoAltProps {
  status: ProjectStatus;
}

export function ProjectStatusDetailInfoAlt({
  status,
}: ProjectStatusDetailInfoAltProps) {
  const tStatus = useTranslations("projects.ProjectStatus");
  const t = useTranslations("projects.ProjectDetail");

  const { onOpenChange: onUpdateStatusModalOpenChange } = useModal(
    "updateProjectStatus",
  );

  const { isPending: isUpdateProjectStatusPending } =
    useUpdateProjectStatusAlt();

  return (
    <DetailInfoAlt
      data-test="project-status-detail-info"
      title={<DetailTitle>{t("status")}</DetailTitle>}
      content={<DetailText>{tStatus(status)}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-project-status-edit-button"
          isPending={isUpdateProjectStatusPending}
          onPress={() => onUpdateStatusModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
