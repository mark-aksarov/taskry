"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
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
  const t = useTranslations("tasks.TaskDetail");

  const { onOpenChange: onUpdateCategoryModalOpenChange } = useModal(
    "updateTaskCategoryRel",
  );

  const { isPending: isUpdateTaskCategoryPending } = useUpdateTaskCategoryRel();

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
