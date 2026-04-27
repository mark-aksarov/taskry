"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useTranslations } from "next-intl";
import { useDeleteTask } from "../DeleteTaskContext";
import { useModal } from "@/common/ModalManagerContext";
import { useUpdateTaskDescription } from "../UpdateTaskDescriptionContext";

interface TaskDescriptionDetailInfoAltProps {
  description?: string;
}

export function TaskDescriptionDetailInfoAlt({
  description,
}: TaskDescriptionDetailInfoAltProps) {
  const t = useTranslations("dashboard.tasks.TaskDetail");

  const { onOpenChange: onUpdateDescriptionModalOpenChange } = useModal(
    "updateTaskDescription",
  );

  //Disable edit button while the task is being deleted
  const { isPending: isDeleteTaskPending } = useDeleteTask();

  //Pending state while updating task description
  const { isPending: isUpdateTaskDescriptionPending } =
    useUpdateTaskDescription();

  return (
    <DetailInfoAlt
      data-test="task-description-detail-info"
      title={<DetailTitle>{t("description")}</DetailTitle>}
      content={
        <DetailText>
          {description ? description : t("noDescription")}
        </DetailText>
      }
      rightSlot={
        <DetailEditButton
          data-test="update-task-description-edit-button"
          isPending={isUpdateTaskDescriptionPending}
          isDisabled={isDeleteTaskPending}
          onPress={() => onUpdateDescriptionModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
