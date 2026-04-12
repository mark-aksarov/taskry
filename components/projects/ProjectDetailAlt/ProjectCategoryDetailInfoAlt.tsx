"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { useUpdateProjectCategoryRel } from "../UpdateProjectCategoryRelContext";

interface ProjectCategoryDetailInfoAltProps {
  category?: {
    id: number;
    name: string;
  };
}

export function ProjectCategoryDetailInfoAlt({
  category,
}: ProjectCategoryDetailInfoAltProps) {
  const t = useTranslations("projects.ProjectDetail");

  const { onOpenChange: onUpdateCategoryModalOpenChange } = useModal(
    "updateProjectCategoryRel",
  );

  const { isPending: isUpdateProjectCategoryPending } =
    useUpdateProjectCategoryRel();

  return (
    <DetailInfoAlt
      data-test="project-category-detail-info"
      title={<DetailTitle>{t("category")}</DetailTitle>}
      text={
        <DetailText>{category ? category.name : t("noCategory")}</DetailText>
      }
      editButton={
        <DetailEditButton
          data-test="update-project-category-edit-button"
          isPending={isUpdateProjectCategoryPending}
          onPress={() => onUpdateCategoryModalOpenChange(true)}
        />
      }
    />
  );
}
