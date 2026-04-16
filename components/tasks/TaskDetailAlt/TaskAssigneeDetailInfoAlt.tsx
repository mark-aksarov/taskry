"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
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
  const t = useTranslations("tasks.TaskDetail");

  const { onOpenChange: onUpdateAssigneeModalOpenChange } =
    useModal("updateTaskAssignee");

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
          onPress={() => onUpdateAssigneeModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
