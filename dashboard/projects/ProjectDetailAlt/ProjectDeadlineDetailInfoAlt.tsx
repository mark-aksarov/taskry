"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useFormatter, useTranslations } from "next-intl";
import { useDeleteProject } from "../DeleteProjectContext";
import { useModal } from "@/common/ModalManagerContext";
import { useUpdateProjectDeadline } from "../UpdateProjectDeadlineContext";

interface ProjectDeadlineDetailInfoAltProps {
  deadline: string;
}

export function ProjectDeadlineDetailInfoAlt({
  deadline,
}: ProjectDeadlineDetailInfoAltProps) {
  const t = useTranslations("dashboard.projects.ProjectDetail");

  const { onOpenChange: onUpdateBirthdateModalOpenChange } = useModal(
    "updateProjectDeadline",
  );

  //Disable edit button while the project is being deleted
  const { isPending: isDeleteProjectPending } = useDeleteProject();

  //Pending state while updating project deadline
  const { isPending: isUpdateProjectDeadlinePending } =
    useUpdateProjectDeadline();

  const format = useFormatter();

  const formattedBirthdate = format.dateTime(new Date(deadline), {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <DetailInfoAlt
      data-test="project-deadline-detail-info"
      title={<DetailTitle>{t("deadline")}</DetailTitle>}
      content={<DetailText>{formattedBirthdate}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-project-deadline-edit-button"
          isPending={isUpdateProjectDeadlinePending}
          isDisabled={isDeleteProjectPending}
          onPress={() => onUpdateBirthdateModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
