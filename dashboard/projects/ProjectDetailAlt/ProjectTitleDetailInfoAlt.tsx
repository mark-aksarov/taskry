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
import { useUpdateProjectTitle } from "../UpdateProjectTitleContext";

interface ProjectTitleDetailInfoAltProps {
  title: string;
}

export function ProjectTitleDetailInfoAlt({
  title,
}: ProjectTitleDetailInfoAltProps) {
  const t = useTranslations("dashboard.projects.ProjectDetail");

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onUpdateTitleModalOpenChange } =
    useModal("updateProjectTitle");

  //Disable edit button while the project is being deleted
  const { isPending: isDeleteProjectPending } = useDeleteProject();

  //Pending state while updating project title
  const { isPending: isUpdateProjectTitlePending } = useUpdateProjectTitle();

  const handlePress = () => {
    guestGuard(() => onUpdateTitleModalOpenChange(true));
  };

  return (
    <DetailInfoAlt
      data-test="project-title-detail-info"
      title={<DetailTitle>{t("title")}</DetailTitle>}
      content={<DetailText>{title}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-project-title-edit-button"
          isPending={isUpdateProjectTitlePending}
          isDisabled={isDeleteProjectPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
