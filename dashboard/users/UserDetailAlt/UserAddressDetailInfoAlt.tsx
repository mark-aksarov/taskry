"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useTranslations } from "next-intl";
import { useDeleteUser } from "../DeleteUserContext";
import { useModal } from "@/common/ModalManagerContext";
import { useUpdateUserAddress } from "../UpdateUserAddressContext";

interface UserAddressDetailInfoAltProps {
  address?: string;
}

export function UserAddressDetailInfoAlt({
  address,
}: UserAddressDetailInfoAltProps) {
  const t = useTranslations("dashboard.users.UserDetail");

  const { onOpenChange: onUpdateAddressModalOpenChange } =
    useModal("updateUserAddress");

  //Disable edit button while the user is being deleted
  const { isPending: isDeleteUserPending } = useDeleteUser();

  //Pending state while updating user address
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
          isDisabled={isDeleteUserPending}
          onPress={() => onUpdateAddressModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
