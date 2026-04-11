"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { useUpdateTaskDescription } from "../UpdateTaskDescriptionContext";

interface TaskDescriptionDetailInfoAltProps {
  description?: string;
}

export function TaskDescriptionDetailInfoAlt({
  description,
}: TaskDescriptionDetailInfoAltProps) {
  const t = useTranslations("tasks.TaskDetail");

  const { onOpenChange: onUpdateDescriptionModalOpenChange } = useModal(
    "updateTaskDescription",
  );

  const { isPending: isUpdateTaskDescriptionPending } =
    useUpdateTaskDescription();

  return (
    <DetailInfoAlt
      data-test="task-description-detail-info"
      title={<DetailTitle>{t("description")}</DetailTitle>}
      text={
        <DetailText>
          {description ? description : t("noDescription")}
        </DetailText>
      }
      editButton={
        <DetailEditButton
          data-test="update-task-description-edit-button"
          isPending={isUpdateTaskDescriptionPending}
          onPress={() => onUpdateDescriptionModalOpenChange(true)}
        />
      }
    />
  );
}
