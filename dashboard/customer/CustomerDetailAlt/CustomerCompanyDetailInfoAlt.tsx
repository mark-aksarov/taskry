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
import { useUpdateCustomerCompany } from "../UpdateCustomerCompanyContext";

interface CustomerCompanyDetailInfoAltProps {
  company?: {
    name: string;
  };
}

export function CustomerCompanyDetailInfoAlt({
  company,
}: CustomerCompanyDetailInfoAltProps) {
  const t = useTranslations("dashboard.customers.CustomerDetail");

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onUpdatePositionModalOpenChange } = useModal(
    "updateCustomerCompany",
  );

  //Disable edit button while the customer is being deleted
  const { isPending: isDeleteCustomerPending } = useDeleteCustomer();

  //Pending state while updating customer company
  const { isPending: isUpdateCustomerCompanyPending } =
    useUpdateCustomerCompany();

  const handlePress = () => {
    guestGuard(() => onUpdatePositionModalOpenChange(true));
  };

  return (
    <DetailInfoAlt
      data-test="customer-company-detail-info"
      title={<DetailTitle>{t("company")}</DetailTitle>}
      content={<DetailText>{company?.name || t("noCompany")}</DetailText>}
      rightSlot={
        <DetailEditButton
          aria-label={t("editCompanyButtonLabel")}
          data-test="edit-company-button"
          isPending={isUpdateCustomerCompanyPending}
          isDisabled={isDeleteCustomerPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
