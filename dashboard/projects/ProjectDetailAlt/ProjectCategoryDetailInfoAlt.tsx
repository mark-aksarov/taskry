"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { useDeleteProject } from "../DeleteProjectContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
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
  const t = useTranslations("dashboard.projects.ProjectDetail");

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onUpdateCategoryModalOpenChange } = useModal(
    "updateProjectCategoryRel",
  );

  //Disable edit button while the project is being deleted
  const { isPending: isDeleteProjectPending } = useDeleteProject();

  //Pending state while updating project category
  const { isPending: isUpdateProjectCategoryPending } =
    useUpdateProjectCategoryRel();

  const handlePress = () => {
    guestGuard(() => onUpdateCategoryModalOpenChange(true));
  };

  return (
    <DetailInfoAlt
      data-test="project-category-detail-info"
      title={<DetailTitle>{t("category")}</DetailTitle>}
      content={
        <DetailText>{category ? category.name : t("noCategory")}</DetailText>
      }
      rightSlot={
        <DetailEditButton
          aria-label={t("editProjectCategoryButtonLabel")}
          data-test="edit-project-category-button"
          isPending={isUpdateProjectCategoryPending}
          isDisabled={isDeleteProjectPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
