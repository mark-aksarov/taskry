"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useUpdateCustomerBio } from "../UpdateCustomerBioContext";
import { useModal } from "@/components/common/ModalManagerContext";

interface CustomerBioDetailInfoAltProps {
  bio?: string;
}

export function CustomerBioDetailInfoAlt({
  bio,
}: CustomerBioDetailInfoAltProps) {
  const t = useTranslations("customers.CustomerDetail");

  const { onOpenChange: onUpdateBioModalOpenChange } =
    useModal("updateCustomerBio");

  const { isPending: isUpdateCustomerBioPending } = useUpdateCustomerBio();

  return (
    <DetailInfoAlt
      data-test="customer-bio-detail-info"
      title={<DetailTitle>{t("bio")}</DetailTitle>}
      text={<DetailText>{bio || t("noBio")}</DetailText>}
      editButton={
        <DetailEditButton
          data-test="update-customer-bio-edit-button"
          isPending={isUpdateCustomerBioPending}
          onPress={() => onUpdateBioModalOpenChange(true)}
        />
      }
    />
  );
}
