"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useDeleteProject } from "../DeleteProjectContext";
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

  //Disable edit button while the project is being deleted
  const { isPending: isDeleteProjectPending } = useDeleteProject();

  //Pending state while updating project category
  const { isPending: isUpdateProjectCategoryPending } =
    useUpdateProjectCategoryRel();

  return (
    <DetailInfoAlt
      data-test="project-category-detail-info"
      title={<DetailTitle>{t("category")}</DetailTitle>}
      content={
        <DetailText>{category ? category.name : t("noCategory")}</DetailText>
      }
      rightSlot={
        <DetailEditButton
          data-test="update-project-category-edit-button"
          isPending={isUpdateProjectCategoryPending}
          isDisabled={isDeleteProjectPending}
          onPress={() => onUpdateCategoryModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
