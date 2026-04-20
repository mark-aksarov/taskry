"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useTranslations } from "next-intl";
import { useUpdateCustomerFullName } from "../UpdateCustomerFullNameContext";
import { useModal } from "@/dashboard/common/ModalManagerContext";

interface CustomerFullNameDetailInfoAltProps {
  fullName: string;
}

export function CustomerFullNameDetailInfoAlt({
  fullName,
}: CustomerFullNameDetailInfoAltProps) {
  const t = useTranslations("dashboard.customers.CustomerDetail");

  const { onOpenChange: onUpdateFullNameModalOpenChange } = useModal(
    "updateCustomerFullName",
  );

  const { isPending: isUpdateCustomerFullNamePending } =
    useUpdateCustomerFullName();

  return (
    <DetailInfoAlt
      data-test="customer-full-name-detail-info"
      title={<DetailTitle>{t("fullName")}</DetailTitle>}
      content={<DetailText>{fullName}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-customer-full-name-edit-button"
          isPending={isUpdateCustomerFullNamePending}
          onPress={() => onUpdateFullNameModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
