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
import { useUpdateCustomerBio } from "../UpdateCustomerBioContext";

interface CustomerBioDetailInfoAltProps {
  bio?: string;
}

export function CustomerBioDetailInfoAlt({
  bio,
}: CustomerBioDetailInfoAltProps) {
  const t = useTranslations("dashboard.customers.CustomerDetail");

  const { onOpenChange: onUpdateBioModalOpenChange } =
    useModal("updateCustomerBio");

  //Disable edit button while the customer is being deleted
  const { isPending: isDeleteCustomerPending } = useDeleteCustomer();

  //Pending state while updating customer bio
  const { isPending: isUpdateCustomerBioPending } = useUpdateCustomerBio();

  return (
    <DetailInfoAlt
      data-test="customer-bio-detail-info"
      title={<DetailTitle>{t("bio")}</DetailTitle>}
      content={<DetailText>{bio || t("noBio")}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-customer-bio-edit-button"
          isPending={isUpdateCustomerBioPending}
          isDisabled={isDeleteCustomerPending}
          onPress={() => onUpdateBioModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
