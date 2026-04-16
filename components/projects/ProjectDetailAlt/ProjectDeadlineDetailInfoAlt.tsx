"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useFormatter, useTranslations } from "next-intl";
import { useUpdateProjectDeadline } from "../UpdateProjectDeadlineContext";
import { useModal } from "@/components/common/ModalManagerContext";

interface ProjectDeadlineDetailInfoAltProps {
  deadline: string;
}

export function ProjectDeadlineDetailInfoAlt({
  deadline,
}: ProjectDeadlineDetailInfoAltProps) {
  const t = useTranslations("projects.ProjectDetail");

  const { onOpenChange: onUpdateBirthdateModalOpenChange } = useModal(
    "updateProjectDeadline",
  );

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
          onPress={() => onUpdateBirthdateModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
