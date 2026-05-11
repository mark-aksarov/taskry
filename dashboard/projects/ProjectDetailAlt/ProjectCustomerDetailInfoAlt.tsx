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

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onUpdateCustomerModalOpenChange } = useModal(
    "updateProjectCustomer",
  );

  //Disable edit button while the project is being deleted
  const { isPending: isDeleteProjectPending } = useDeleteProject();

  //Pending state while updating project customer
  const { isPending: isUpdateProjectCustomerPending } =
    useUpdateProjectCustomer();

  const handlePress = () => {
    guestGuard(() => onUpdateCustomerModalOpenChange(true));
  };

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
          aria-label={t("editCustomerButtonLabel")}
          data-test="edit-customer-edit-button"
          isPending={isUpdateProjectCustomerPending}
          isDisabled={isDeleteProjectPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
