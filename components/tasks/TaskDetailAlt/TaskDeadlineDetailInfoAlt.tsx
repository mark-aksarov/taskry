"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useFormatter, useTranslations } from "next-intl";
import { useUpdateTaskDeadline } from "../UpdateTaskDeadlineContext";
import { useModal } from "@/components/common/ModalManagerContext";

interface TaskDeadlineDetailInfoAltProps {
  deadline: string;
}

export function TaskDeadlineDetailInfoAlt({
  deadline,
}: TaskDeadlineDetailInfoAltProps) {
  const t = useTranslations("tasks.TaskDetail");

  const { onOpenChange: onUpdateBirthdateModalOpenChange } =
    useModal("updateTaskDeadline");

  const { isPending: isUpdateTaskDeadlinePending } = useUpdateTaskDeadline();

  const format = useFormatter();

  const formattedBirthdate = format.dateTime(new Date(deadline), {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <DetailInfoAlt
      data-test="task-deadline-detail-info"
      title={<DetailTitle>{t("deadline")}</DetailTitle>}
      text={<DetailText>{formattedBirthdate}</DetailText>}
      editButton={
        <DetailEditButton
          data-test="update-task-deadline-edit-button"
          isPending={isUpdateTaskDeadlinePending}
          onPress={() => onUpdateBirthdateModalOpenChange(true)}
        />
      }
    />
  );
}
