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
import { useUpdateTaskAssignee } from "../UpdateTaskAssigneeContext";

interface TaskAssigneeDetailInfoAltProps {
  assignee?: {
    id: string;
    fullName: string;
  };
}

export function TaskAssigneeDetailInfoAlt({
  assignee,
}: TaskAssigneeDetailInfoAltProps) {
  const t = useTranslations("dashboard.tasks.TaskDetail");

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onUpdateAssigneeModalOpenChange } =
    useModal("updateTaskAssignee");

  //Disable edit button while the task is being deleted
  const { isPending: isDeleteTaskPending } = useDeleteTask();

  //Pending state while updating task assignee
  const { isPending: isUpdateTaskAssigneePending } = useUpdateTaskAssignee();

  const handlePress = () => {
    guestGuard(() => onUpdateAssigneeModalOpenChange(true));
  };

  return (
    <DetailInfoAlt
      data-test="task-assignee-detail-info"
      title={<DetailTitle>{t("assignee")}</DetailTitle>}
      content={
        <DetailText>
          {assignee ? assignee.fullName : t("noAssignee")}
        </DetailText>
      }
      rightSlot={
        <DetailEditButton
          aria-label={t("editAssigneeButtonLabel")}
          data-test="edit-assignee-button"
          isPending={isUpdateTaskAssigneePending}
          isDisabled={isDeleteTaskPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
