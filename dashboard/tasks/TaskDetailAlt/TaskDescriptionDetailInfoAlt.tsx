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
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useUpdateTaskDescription } from "../UpdateTaskDescriptionContext";

interface TaskDescriptionDetailInfoAltProps {
  description?: string;
}

export function TaskDescriptionDetailInfoAlt({
  description,
}: TaskDescriptionDetailInfoAltProps) {
  const t = useTranslations("dashboard.tasks.TaskDetail");

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onUpdateDescriptionModalOpenChange } = useModal(
    "updateTaskDescription",
  );

  //Disable edit button while the task is being deleted
  const { isPending: isDeleteTaskPending } = useDeleteTask();

  //Pending state while updating task description
  const { isPending: isUpdateTaskDescriptionPending } =
    useUpdateTaskDescription();

  const handlePress = () => {
    guestGuard(() => onUpdateDescriptionModalOpenChange(true));
  };

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
          aria-label={t("editDescriptionButtonLabel")}
          data-test="edit-description-button"
          isPending={isUpdateTaskDescriptionPending}
          isDisabled={isDeleteTaskPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
