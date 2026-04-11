"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { useUpdateCustomerPhoneNumber } from "../UpdateCustomerPhoneNumberContext";

interface CustomerPhoneNumberDetailInfoAltProps {
  phoneNumber?: string;
}

export function CustomerPhoneNumberDetailInfoAlt({
  phoneNumber,
}: CustomerPhoneNumberDetailInfoAltProps) {
  const t = useTranslations("customers.CustomerDetail");

  const { onOpenChange: onUpdatePhoneNumberModalOpenChange } = useModal(
    "updateCustomerPhoneNumber",
  );

  const { isPending: isUpdateCustomerPhoneNumberPending } =
    useUpdateCustomerPhoneNumber();

  return (
    <DetailInfoAlt
      data-test="customer-phone-number-detail-info"
      title={<DetailTitle>{t("phoneNumber")}</DetailTitle>}
      text={<DetailText>{phoneNumber || t("noPhoneNumber")}</DetailText>}
      editButton={
        <DetailEditButton
          data-test="update-customer-phone-number-edit-button"
          isPending={isUpdateCustomerPhoneNumberPending}
          onPress={() => onUpdatePhoneNumberModalOpenChange(true)}
        />
      }
    />
  );
}
