"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useModal } from "@/common/ModalManagerContext";
import { useFormatter, useTranslations } from "next-intl";
import { useDeleteProject } from "../DeleteProjectContext";
import { useUpdateProjectDeadline } from "../UpdateProjectDeadlineContext";
import { useDeadline } from "@/dashboard/common/DeadlineContext";

export function ProjectDeadlineDetailInfoAlt() {
  const t = useTranslations("dashboard.projects.ProjectDetail");

  const { deadline } = useDeadline();

  const { onOpenChange: onUpdateBirthdateModalOpenChange } = useModal(
    "updateProjectDeadline",
  );

  //Disable edit button while the project is being deleted
  const { isPending: isDeleteProjectPending } = useDeleteProject();

  //Pending state while updating project deadline
  const { isPending: isUpdateProjectDeadlinePending } =
    useUpdateProjectDeadline();

  const format = useFormatter();

  const formattedBirthdate = format.dateTime(deadline, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handlePress = () => {
    onUpdateBirthdateModalOpenChange(true);
  };

  return (
    <DetailInfoAlt
      data-test="project-deadline-detail-info"
      title={<DetailTitle>{t("deadline")}</DetailTitle>}
      content={<DetailText>{formattedBirthdate}</DetailText>}
      rightSlot={
        <DetailEditButton
          aria-label={t("editDeadlineButtonLabel")}
          data-test="edit-deadline-button"
          isPending={isUpdateProjectDeadlinePending}
          isDisabled={isDeleteProjectPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
