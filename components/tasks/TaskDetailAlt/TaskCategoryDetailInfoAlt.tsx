"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { useUpdateTaskCategoryForTask } from "../UpdateTaskCategoryForTaskContext";

interface TaskCategoryDetailInfoAltProps {
  category?: {
    id: number;
    name: string;
  };
}

export function TaskCategoryDetailInfoAlt({
  category,
}: TaskCategoryDetailInfoAltProps) {
  const t = useTranslations("tasks.TaskDetail");

  const { onOpenChange: onUpdateCategoryModalOpenChange } = useModal(
    "updateTaskCategoryForTask",
  );

  const { isPending: isUpdateTaskCategoryPending } =
    useUpdateTaskCategoryForTask();

  return (
    <DetailInfoAlt
      data-test="task-category-detail-info"
      title={<DetailTitle>{t("category")}</DetailTitle>}
      text={
        <DetailText>{category ? category.name : t("noCategory")}</DetailText>
      }
      editButton={
        <DetailEditButton
          data-test="update-task-category-edit-button"
          isPending={isUpdateTaskCategoryPending}
          onPress={() => onUpdateCategoryModalOpenChange(true)}
        />
      }
    />
  );
}
