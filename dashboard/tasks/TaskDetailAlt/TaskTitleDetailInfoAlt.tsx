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
import { useUpdateTaskTitle } from "../UpdateTaskTitleContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";

interface TaskTitleDetailInfoAltProps {
  title: string;
}

export function TaskTitleDetailInfoAlt({ title }: TaskTitleDetailInfoAltProps) {
  const t = useTranslations("dashboard.tasks.TaskDetail");

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onUpdateTitleModalOpenChange } =
    useModal("updateTaskTitle");

  //Disable edit button while the task is being deleted
  const { isPending: isDeleteTaskPending } = useDeleteTask();

  //Pending state while updating task title
  const { isPending: isUpdateTaskTitlePending } = useUpdateTaskTitle();

  const handlePress = () => {
    guestGuard(() => onUpdateTitleModalOpenChange(true));
  };

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
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
