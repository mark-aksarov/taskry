"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useDeleteTask } from "../DeleteTaskContext";
import { TaskStatus } from "@/generated/prisma/enums";
import { useModal } from "@/components/common/ModalManagerContext";
import { useUpdateTaskStatusAlt } from "../UpdateTaskStatusAltContext";

interface TaskStatusDetailInfoAltProps {
  status: TaskStatus;
}

export function TaskStatusDetailInfoAlt({
  status,
}: TaskStatusDetailInfoAltProps) {
  const tStatus = useTranslations("tasks.TaskStatus");
  const t = useTranslations("tasks.TaskDetail");

  const { onOpenChange: onUpdateStatusModalOpenChange } =
    useModal("updateTaskStatus");

  //Disable edit button while the task is being deleted
  const { isPending: isDeleteTaskPending } = useDeleteTask();

  //Pending state while updating task status
  const { isPending: isUpdateTaskStatusPending } = useUpdateTaskStatusAlt();

  return (
    <DetailInfoAlt
      data-test="task-status-detail-info"
      title={<DetailTitle>{t("status")}</DetailTitle>}
      content={<DetailText>{tStatus(status)}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-task-status-edit-button"
          isPending={isUpdateTaskStatusPending}
          isDisabled={isDeleteTaskPending}
          onPress={() => onUpdateStatusModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
