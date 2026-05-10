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
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useUpdateCustomerFullName } from "../UpdateCustomerFullNameContext";

interface CustomerFullNameDetailInfoAltProps {
  fullName: string;
}

export function CustomerFullNameDetailInfoAlt({
  fullName,
}: CustomerFullNameDetailInfoAltProps) {
  const t = useTranslations("dashboard.customers.CustomerDetail");

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onUpdateFullNameModalOpenChange } = useModal(
    "updateCustomerFullName",
  );

  //Disable edit button while the customer is being deleted
  const { isPending: isDeleteCustomerPending } = useDeleteCustomer();

  //Pending state while updating customer full name
  const { isPending: isUpdateCustomerFullNamePending } =
    useUpdateCustomerFullName();

  const handlePress = () => {
    guestGuard(() => onUpdateFullNameModalOpenChange(true));
  };

  return (
    <DetailInfoAlt
      data-test="customer-full-name-detail-info"
      title={<DetailTitle>{t("fullName")}</DetailTitle>}
      content={<DetailText>{fullName}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-customer-full-name-edit-button"
          isPending={isUpdateCustomerFullNamePending}
          isDisabled={isDeleteCustomerPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
