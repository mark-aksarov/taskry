"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useTranslations } from "next-intl";
import { useDeleteProject } from "../DeleteProjectContext";
import { useModal } from "@/common/ModalManagerContext";
import { useUpdateProjectCustomer } from "../UpdateProjectCustomerContext";

interface ProjectCustomerDetailInfoAltProps {
  customer?: {
    id: number;
    fullName: string;
  };
}

export function ProjectCustomerDetailInfoAlt({
  customer,
}: ProjectCustomerDetailInfoAltProps) {
  const t = useTranslations("dashboard.projects.ProjectDetail");

  const { onOpenChange: onUpdateCustomerModalOpenChange } = useModal(
    "updateProjectCustomer",
  );

  //Disable edit button while the project is being deleted
  const { isPending: isDeleteProjectPending } = useDeleteProject();

  //Pending state while updating project customer
  const { isPending: isUpdateProjectCustomerPending } =
    useUpdateProjectCustomer();

  return (
    <DetailInfoAlt
      data-test="project-customer-detail-info"
      title={<DetailTitle>{t("customer")}</DetailTitle>}
      content={
        <DetailText>
          {customer ? customer.fullName : t("noCustomer")}
        </DetailText>
      }
      rightSlot={
        <DetailEditButton
          data-test="update-project-customer-edit-button"
          isPending={isUpdateProjectCustomerPending}
          isDisabled={isDeleteProjectPending}
          onPress={() => onUpdateCustomerModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
