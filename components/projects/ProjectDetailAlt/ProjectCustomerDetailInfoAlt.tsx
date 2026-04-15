"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
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
  const t = useTranslations("projects.ProjectDetail");

  const { onOpenChange: onUpdateCustomerModalOpenChange } = useModal(
    "updateProjectCustomer",
  );

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
      editButton={
        <DetailEditButton
          data-test="update-project-customer-edit-button"
          isPending={isUpdateProjectCustomerPending}
          onPress={() => onUpdateCustomerModalOpenChange(true)}
        />
      }
    />
  );
}
