"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useTranslations } from "next-intl";
import { useDeleteTask } from "../DeleteTaskContext";
import { useUpdateTaskTitle } from "../UpdateTaskTitleContext";
import { useModal } from "@/dashboard/common/ModalManagerContext";

interface TaskTitleDetailInfoAltProps {
  title: string;
}

export function TaskTitleDetailInfoAlt({ title }: TaskTitleDetailInfoAltProps) {
  const t = useTranslations("dashboard.tasks.TaskDetail");

  const { onOpenChange: onUpdateTitleModalOpenChange } =
    useModal("updateTaskTitle");

  //Disable edit button while the task is being deleted
  const { isPending: isDeleteTaskPending } = useDeleteTask();

  //Pending state while updating task title
  const { isPending: isUpdateTaskTitlePending } = useUpdateTaskTitle();

  return (
    <DetailInfoAlt
      data-test="task-title-detail-info"
      title={<DetailTitle>{t("title")}</DetailTitle>}
      content={<DetailText>{title}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-task-title-edit-button"
          isPending={isUpdateTaskTitlePending}
          isDisabled={isDeleteTaskPending}
          onPress={() => onUpdateTitleModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
