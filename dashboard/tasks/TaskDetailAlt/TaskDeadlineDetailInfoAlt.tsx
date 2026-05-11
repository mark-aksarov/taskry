"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useDeleteTask } from "../DeleteTaskContext";
import { useModal } from "@/common/ModalManagerContext";
import { useFormatter, useTranslations } from "next-intl";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useUpdateTaskDeadline } from "../UpdateTaskDeadlineContext";

interface TaskDeadlineDetailInfoAltProps {
  deadline: string;
}

export function TaskDeadlineDetailInfoAlt({
  deadline,
}: TaskDeadlineDetailInfoAltProps) {
  const t = useTranslations("dashboard.tasks.TaskDetail");

  const guestGuard = useGuestModalGuard();

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

  const handlePress = () => {
    guestGuard(() => onUpdateBirthdateModalOpenChange(true));
  };

  return (
    <DetailInfoAlt
      data-test="task-deadline-detail-info"
      title={<DetailTitle>{t("deadline")}</DetailTitle>}
      content={<DetailText>{formattedBirthdate}</DetailText>}
      rightSlot={
        <DetailEditButton
          aria-label={t("editDeadlineButtonLabel")}
          data-test="edit-deadline-button"
          isPending={isUpdateTaskDeadlinePending}
          isDisabled={isDeleteTaskPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
