"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useTranslations } from "next-intl";
import { useUpdateCustomerBio } from "../UpdateCustomerBioContext";
import { useModal } from "@/dashboard/common/ModalManagerContext";

interface CustomerBioDetailInfoAltProps {
  bio?: string;
}

export function CustomerBioDetailInfoAlt({
  bio,
}: CustomerBioDetailInfoAltProps) {
  const t = useTranslations("dashboard.customers.CustomerDetail");

  const { onOpenChange: onUpdateBioModalOpenChange } =
    useModal("updateCustomerBio");

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
          onPress={() => onUpdateBioModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
