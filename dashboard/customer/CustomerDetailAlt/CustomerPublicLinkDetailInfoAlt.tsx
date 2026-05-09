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
import { useUpdateCustomerPublicLink } from "../UpdateCustomerPublicLinkContext";

interface CustomerPublicLinkDetailInfoAltProps {
  publicLink?: string;
}

export function CustomerPublicLinkDetailInfoAlt({
  publicLink,
}: CustomerPublicLinkDetailInfoAltProps) {
  const t = useTranslations("dashboard.customers.CustomerDetail");

  const { onOpenChange: onUpdatePublicLinkModalOpenChange } = useModal(
    "updateCustomerPublicLink",
  );

  //Disable edit button while the customer is being deleted
  const { isPending: isDeleteCustomerPending } = useDeleteCustomer();

  //Pending state while updating customer public link
  const { isPending: isUpdateCustomerPublicLinkPending } =
    useUpdateCustomerPublicLink();

  return (
    <DetailInfoAlt
      data-test="customer-public-link-detail-info"
      className="border-none pb-0"
      title={<DetailTitle>{t("publicLink")}</DetailTitle>}
      content={<DetailText>{publicLink || t("noPublicLink")}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-customer-public-link-edit-button"
          isPending={isUpdateCustomerPublicLinkPending}
          isDisabled={isDeleteCustomerPending}
          onPress={() => onUpdatePublicLinkModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
