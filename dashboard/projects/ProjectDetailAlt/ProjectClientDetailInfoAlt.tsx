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
import { useUpdateProjectClient } from "../UpdateProjectClientContext";

interface ProjectClientDetailInfoAltProps {
  client?: {
    id: number;
    fullName: string;
  };
}

export function ProjectClientDetailInfoAlt({
  client,
}: ProjectClientDetailInfoAltProps) {
  const t = useTranslations("dashboard.projects.ProjectDetail");

  const { onOpenChange: onUpdateClientModalOpenChange } = useModal(
    "updateProjectClient",
  );

  //Disable edit button while the project is being deleted
  const { isPending: isDeleteProjectPending } = useDeleteProject();

  //Pending state while updating project client
  const { isPending: isUpdateProjectClientPending } = useUpdateProjectClient();

  const handlePress = () => {
    onUpdateClientModalOpenChange(true);
  };

  return (
    <DetailInfoAlt
      data-test="project-client-detail-info"
      title={<DetailTitle>{t("client")}</DetailTitle>}
      content={
        <DetailText>{client ? client.fullName : t("noClient")}</DetailText>
      }
      rightSlot={
        <DetailEditButton
          aria-label={t("editClientButtonLabel")}
          data-test="edit-client-edit-button"
          isPending={isUpdateProjectClientPending}
          isDisabled={isDeleteProjectPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
