"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useDeleteProject } from "../DeleteProjectContext";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { useUpdateProjectStatusAlt } from "../UpdateProjectStatusAltContext";

interface ProjectStatusDetailInfoAltProps {
  status: ProjectStatus;
}

export function ProjectStatusDetailInfoAlt({
  status,
}: ProjectStatusDetailInfoAltProps) {
  const tStatus = useTranslations("dashboard.projects.ProjectStatus");
  const t = useTranslations("dashboard.projects.ProjectDetail");

  //Disable edit button while the project is being deleted
  const { isPending: isDeleteProjectPending } = useDeleteProject();

  //Pending state while updating project status
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
          isDisabled={isDeleteProjectPending}
          onPress={() => onUpdateStatusModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
