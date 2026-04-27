"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useDeleteTask } from "../DeleteTaskContext";
import { useFormatter, useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { useUpdateTaskDeadline } from "../UpdateTaskDeadlineContext";

interface TaskDeadlineDetailInfoAltProps {
  deadline: string;
}

export function TaskDeadlineDetailInfoAlt({
  deadline,
}: TaskDeadlineDetailInfoAltProps) {
  const t = useTranslations("dashboard.tasks.TaskDetail");

  const { onOpenChange: onUpdateBirthdateModalOpenChange } =
    useModal("updateTaskDeadline");

  //Disable edit button while the task is being deleted
  const { isPending: isDeleteTaskPending } = useDeleteTask();

  //Pending state while updating task deadline
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
      content={<DetailText>{formattedBirthdate}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-task-deadline-edit-button"
          isPending={isUpdateTaskDeadlinePending}
          isDisabled={isDeleteTaskPending}
          onPress={() => onUpdateBirthdateModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
