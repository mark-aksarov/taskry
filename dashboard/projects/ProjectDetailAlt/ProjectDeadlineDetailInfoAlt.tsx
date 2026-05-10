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
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useUpdateProjectDeadline } from "../UpdateProjectDeadlineContext";

interface ProjectDeadlineDetailInfoAltProps {
  deadline: string;
}

export function ProjectDeadlineDetailInfoAlt({
  deadline,
}: ProjectDeadlineDetailInfoAltProps) {
  const t = useTranslations("dashboard.projects.ProjectDetail");

  const guestGuard = useGuestModalGuard();

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

  const handlePress = () => {
    guestGuard(() => onUpdateBirthdateModalOpenChange(true));
  };

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
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
