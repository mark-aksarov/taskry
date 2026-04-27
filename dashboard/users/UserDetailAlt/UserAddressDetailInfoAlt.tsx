"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useTranslations } from "next-intl";
import { useUpdateUserAddress } from "../UpdateUserAddressContext";
import { useModal } from "@/common/ModalManagerContext";

interface UserAddressDetailInfoAltProps {
  address?: string;
}

export function UserAddressDetailInfoAlt({
  address,
}: UserAddressDetailInfoAltProps) {
  const t = useTranslations("dashboard.users.UserDetail");

  const { onOpenChange: onUpdateAddressModalOpenChange } =
    useModal("updateUserAddress");

  const { isPending: isUpdateUserAddressPending } = useUpdateUserAddress();

  return (
    <DetailInfoAlt
      data-test="user-address-detail-info"
      title={<DetailTitle>{t("address")}</DetailTitle>}
      content={<DetailText>{address || t("noAddress")}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-user-address-edit-button"
          isPending={isUpdateUserAddressPending}
          onPress={() => onUpdateAddressModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
