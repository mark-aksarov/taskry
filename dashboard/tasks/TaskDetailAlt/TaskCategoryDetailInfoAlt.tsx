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
import { useUpdateTaskCategoryRel } from "../UpdateTaskCategoryRelContext";

interface TaskCategoryDetailInfoAltProps {
  category?: {
    id: number;
    name: string;
  };
}

export function TaskCategoryDetailInfoAlt({
  category,
}: TaskCategoryDetailInfoAltProps) {
  const t = useTranslations("dashboard.tasks.TaskDetail");

  const { onOpenChange: onUpdateCategoryModalOpenChange } = useModal(
    "updateTaskCategoryRel",
  );

  //Disable edit button while the task is being deleted
  const { isPending: isDeleteTaskPending } = useDeleteTask();

  //Pending state while updating task category
  const { isPending: isUpdateTaskCategoryPending } = useUpdateTaskCategoryRel();

  return (
    <DetailInfoAlt
      data-test="task-category-detail-info"
      title={<DetailTitle>{t("category")}</DetailTitle>}
      content={
        <DetailText>{category ? category.name : t("noCategory")}</DetailText>
      }
      rightSlot={
        <DetailEditButton
          data-test="update-task-category-edit-button"
          isPending={isUpdateTaskCategoryPending}
          isDisabled={isDeleteTaskPending}
          onPress={() => onUpdateCategoryModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
