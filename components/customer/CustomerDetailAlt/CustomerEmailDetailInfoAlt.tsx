"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useUpdateCustomerEmail } from "../UpdateCustomerEmailContext";
import { useModal } from "@/components/common/ModalManagerContext";

interface CustomerEmailDetailInfoAltProps {
  email: string;
}

export function CustomerEmailDetailInfoAlt({
  email,
}: CustomerEmailDetailInfoAltProps) {
  const t = useTranslations("customers.CustomerDetail");

  const { onOpenChange: onUpdateEmailModalOpenChange } = useModal(
    "updateCustomerEmail",
  );

  const { isPending: isUpdateCustomerEmailPending } = useUpdateCustomerEmail();

  return (
    <DetailInfoAlt
      data-test="customer-email-detail-info"
      title={<DetailTitle>{t("email")}</DetailTitle>}
      text={<DetailText>{email}</DetailText>}
      editButton={
        <DetailEditButton
          data-test="update-customer-email-edit-button"
          isPending={isUpdateCustomerEmailPending}
          onPress={() => onUpdateEmailModalOpenChange(true)}
        />
      }
    />
  );
}
