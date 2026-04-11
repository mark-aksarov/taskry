"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { useUpdateCustomerCompany } from "../UpdateCustomerCompanyContext";

interface CustomerCompanyDetailInfoAltProps {
  company?: {
    name: string;
  };
}

export function CustomerCompanyDetailInfoAlt({
  company,
}: CustomerCompanyDetailInfoAltProps) {
  const t = useTranslations("customers.CustomerDetail");

  const { onOpenChange: onUpdatePositionModalOpenChange } = useModal(
    "updateCustomerCompany",
  );

  const { isPending: isUpdateCustomerCompanyPending } =
    useUpdateCustomerCompany();

  return (
    <DetailInfoAlt
      data-test="customer-company-detail-info"
      title={<DetailTitle>{t("company")}</DetailTitle>}
      text={<DetailText>{company?.name || t("noCompany")}</DetailText>}
      editButton={
        <DetailEditButton
          data-test="update-customer-company-edit-button"
          isPending={isUpdateCustomerCompanyPending}
          onPress={() => onUpdatePositionModalOpenChange(true)}
        />
      }
    />
  );
}
