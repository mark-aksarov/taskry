"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { useUpdateTaskAssignee } from "../UpdateTaskAssigneeContext";
import { useDeleteTask } from "../DeleteTaskContext";

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

  const { onOpenChange: onUpdateAssigneeModalOpenChange } =
    useModal("updateTaskAssignee");

  //Disable edit button while the task is being deleted
  const { isPending: isDeleteTaskPending } = useDeleteTask();

  //Pending state while updating task assignee
  const { isPending: isUpdateTaskAssigneePending } = useUpdateTaskAssignee();

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
          data-test="update-task-assignee-edit-button"
          isPending={isUpdateTaskAssigneePending}
          isDisabled={isDeleteTaskPending}
          onPress={() => onUpdateAssigneeModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
