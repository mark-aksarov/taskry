"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useUpdateTaskTitle } from "../UpdateTaskTitleContext";
import { useModal } from "@/components/common/ModalManagerContext";

interface TaskTitleDetailInfoAltProps {
  title: string;
}

export function TaskTitleDetailInfoAlt({ title }: TaskTitleDetailInfoAltProps) {
  const t = useTranslations("tasks.TaskDetail");

  const { onOpenChange: onUpdateEmailModalOpenChange } =
    useModal("updateTaskTitle");

  const { isPending: isUpdateTaskTitlePending } = useUpdateTaskTitle();

  return (
    <DetailInfoAlt
      data-test="task-title-detail-info"
      title={<DetailTitle>{t("title")}</DetailTitle>}
      text={<DetailText>{title}</DetailText>}
      editButton={
        <DetailEditButton
          data-test="update-task-title-edit-button"
          isPending={isUpdateTaskTitlePending}
          onPress={() => onUpdateEmailModalOpenChange(true)}
        />
      }
    />
  );
}
