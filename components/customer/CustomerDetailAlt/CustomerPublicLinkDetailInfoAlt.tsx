"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { useUpdateCustomerPublicLink } from "../UpdateCustomerPublicLinkContext";

interface CustomerPublicLinkDetailInfoAltProps {
  publicLink?: string;
}

export function CustomerPublicLinkDetailInfoAlt({
  publicLink,
}: CustomerPublicLinkDetailInfoAltProps) {
  const t = useTranslations("customers.CustomerDetail");

  const { onOpenChange: onUpdatePublicLinkModalOpenChange } = useModal(
    "updateCustomerPublicLink",
  );

  const { isPending: isUpdateCustomerPublicLinkPending } =
    useUpdateCustomerPublicLink();

  return (
    <DetailInfoAlt
      data-test="customer-public-link-detail-info"
      className="border-none pb-0"
      title={<DetailTitle>{t("publicLink")}</DetailTitle>}
      text={<DetailText>{publicLink || t("noPublicLink")}</DetailText>}
      editButton={
        <DetailEditButton
          data-test="update-customer-public-link-edit-button"
          isPending={isUpdateCustomerPublicLinkPending}
          onPress={() => onUpdatePublicLinkModalOpenChange(true)}
        />
      }
    />
  );
}
