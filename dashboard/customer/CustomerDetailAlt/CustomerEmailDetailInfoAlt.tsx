"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { useDeleteCustomer } from "../DeleteCustomerContext";
import { useUpdateCustomerEmail } from "../UpdateCustomerEmailContext";

interface CustomerEmailDetailInfoAltProps {
  email: string;
}

export function CustomerEmailDetailInfoAlt({
  email,
}: CustomerEmailDetailInfoAltProps) {
  const t = useTranslations("dashboard.customers.CustomerDetail");

  const { onOpenChange: onUpdateEmailModalOpenChange } = useModal(
    "updateCustomerEmail",
  );

  //Disable edit button while the customer is being deleted
  const { isPending: isDeleteCustomerPending } = useDeleteCustomer();

  //Pending state while updating customer email
  const { isPending: isUpdateCustomerEmailPending } = useUpdateCustomerEmail();

  return (
    <DetailInfoAlt
      data-test="customer-email-detail-info"
      title={<DetailTitle>{t("email")}</DetailTitle>}
      content={<DetailText>{email}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-customer-email-edit-button"
          isPending={isUpdateCustomerEmailPending}
          isDisabled={isDeleteCustomerPending}
          onPress={() => onUpdateEmailModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
