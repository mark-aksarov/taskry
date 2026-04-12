"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { useUpdateTaskProject } from "../UpdateTaskProjectContext";

interface TaskProjectDetailInfoAltProps {
  project?: {
    id: number;
    title: string;
  };
}

export function TaskProjectDetailInfoAlt({
  project,
}: TaskProjectDetailInfoAltProps) {
  const t = useTranslations("tasks.TaskDetail");

  const { onOpenChange: onUpdateProjectModalOpenChange } =
    useModal("updateTaskProject");

  const { isPending: isUpdateTaskProjectPending } = useUpdateTaskProject();

  return (
    <DetailInfoAlt
      data-test="task-project-detail-info"
      title={<DetailTitle>{t("project")}</DetailTitle>}
      text={<DetailText>{project ? project.title : t("noProject")}</DetailText>}
      editButton={
        <DetailEditButton
          data-test="update-task-project-edit-button"
          isPending={isUpdateTaskProjectPending}
          onPress={() => onUpdateProjectModalOpenChange(true)}
        />
      }
    />
  );
}
