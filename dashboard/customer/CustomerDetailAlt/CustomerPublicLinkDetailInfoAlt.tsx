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
import { useUpdateCustomerPublicLink } from "../UpdateCustomerPublicLinkContext";

interface CustomerPublicLinkDetailInfoAltProps {
  publicLink?: string;
}

export function CustomerPublicLinkDetailInfoAlt({
  publicLink,
}: CustomerPublicLinkDetailInfoAltProps) {
  const t = useTranslations("dashboard.customers.CustomerDetail");

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onUpdatePublicLinkModalOpenChange } = useModal(
    "updateCustomerPublicLink",
  );

  //Disable edit button while the customer is being deleted
  const { isPending: isDeleteCustomerPending } = useDeleteCustomer();

  //Pending state while updating customer public link
  const { isPending: isUpdateCustomerPublicLinkPending } =
    useUpdateCustomerPublicLink();

  const handlePress = () => {
    guestGuard(() => onUpdatePublicLinkModalOpenChange(true));
  };

  return (
    <DetailInfoAlt
      data-test="customer-public-link-detail-info"
      className="border-none pb-0"
      title={<DetailTitle>{t("publicLink")}</DetailTitle>}
      content={<DetailText>{publicLink || t("noPublicLink")}</DetailText>}
      rightSlot={
        <DetailEditButton
          aria-label={t("editPublicLinkButtonLabel")}
          data-test="edit-public-link-button"
          isPending={isUpdateCustomerPublicLinkPending}
          isDisabled={isDeleteCustomerPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
