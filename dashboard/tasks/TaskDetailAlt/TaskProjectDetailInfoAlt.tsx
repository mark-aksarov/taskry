"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { useUpdateTaskProject } from "../UpdateTaskProjectContext";
import { useDeleteTask } from "../DeleteTaskContext";

interface TaskProjectDetailInfoAltProps {
  project?: {
    id: number;
    title: string;
  };
}

export function TaskProjectDetailInfoAlt({
  project,
}: TaskProjectDetailInfoAltProps) {
  const t = useTranslations("dashboard.tasks.TaskDetail");

  const { onOpenChange: onUpdateProjectModalOpenChange } =
    useModal("updateTaskProject");

  //Disable edit button while the task is being deleted
  const { isPending: isDeleteTaskPending } = useDeleteTask();

  //Pending state while updating task project
  const { isPending: isUpdateTaskProjectPending } = useUpdateTaskProject();

  return (
    <DetailInfoAlt
      data-test="task-project-detail-info"
      title={<DetailTitle>{t("project")}</DetailTitle>}
      content={
        <DetailText>{project ? project.title : t("noProject")}</DetailText>
      }
      rightSlot={
        <DetailEditButton
          data-test="update-task-project-edit-button"
          isPending={isUpdateTaskProjectPending}
          isDisabled={isDeleteTaskPending}
          onPress={() => onUpdateProjectModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
