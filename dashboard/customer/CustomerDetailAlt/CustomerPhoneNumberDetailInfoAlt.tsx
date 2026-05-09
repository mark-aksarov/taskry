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
import { useUpdateCustomerPhoneNumber } from "../UpdateCustomerPhoneNumberContext";

interface CustomerPhoneNumberDetailInfoAltProps {
  phoneNumber?: string;
}

export function CustomerPhoneNumberDetailInfoAlt({
  phoneNumber,
}: CustomerPhoneNumberDetailInfoAltProps) {
  const t = useTranslations("dashboard.customers.CustomerDetail");

  const { onOpenChange: onUpdatePhoneNumberModalOpenChange } = useModal(
    "updateCustomerPhoneNumber",
  );

  //Disable edit button while the customer is being deleted
  const { isPending: isDeleteCustomerPending } = useDeleteCustomer();

  //Pending state while updating customer phone number
  const { isPending: isUpdateCustomerPhoneNumberPending } =
    useUpdateCustomerPhoneNumber();

  return (
    <DetailInfoAlt
      data-test="customer-phone-number-detail-info"
      title={<DetailTitle>{t("phoneNumber")}</DetailTitle>}
      content={<DetailText>{phoneNumber || t("noPhoneNumber")}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-customer-phone-number-edit-button"
          isPending={isUpdateCustomerPhoneNumberPending}
          isDisabled={isDeleteCustomerPending}
          onPress={() => onUpdatePhoneNumberModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
