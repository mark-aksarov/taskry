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
import { useUpdateTaskProject } from "../UpdateTaskProjectContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";

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

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onUpdateProjectModalOpenChange } =
    useModal("updateTaskProject");

  //Disable edit button while the task is being deleted
  const { isPending: isDeleteTaskPending } = useDeleteTask();

  //Pending state while updating task project
  const { isPending: isUpdateTaskProjectPending } = useUpdateTaskProject();

  const handlePress = () => {
    guestGuard(() => onUpdateProjectModalOpenChange(true));
  };

  return (
    <DetailInfoAlt
      data-test="task-project-detail-info"
      title={<DetailTitle>{t("project")}</DetailTitle>}
      content={
        <DetailText>{project ? project.title : t("noProject")}</DetailText>
      }
      rightSlot={
        <DetailEditButton
          aria-label={t("editProjectButtonLabel")}
          data-test="edit-project-button"
          isPending={isUpdateTaskProjectPending}
          isDisabled={isDeleteTaskPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
