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
import { useUpdateUserPhoneNumber } from "../UpdateUserPhoneNumberContext";

interface UserPhoneNumberDetailInfoAltProps {
  phoneNumber?: string;
}

export function UserPhoneNumberDetailInfoAlt({
  phoneNumber,
}: UserPhoneNumberDetailInfoAltProps) {
  const t = useTranslations("dashboard.users.UserDetail");

  const { onOpenChange: onUpdatePhoneNumberModalOpenChange } = useModal(
    "updateUserPhoneNumber",
  );

  //Disable edit button while the user is being deleted
  const { isPending: isDeleteUserPending } = useDeleteUser();

  //Pending state while updating user phone number
  const { isPending: isUpdateUserPhoneNumberPending } =
    useUpdateUserPhoneNumber();

  return (
    <DetailInfoAlt
      data-test="user-phone-number-detail-info"
      title={<DetailTitle>{t("phoneNumber")}</DetailTitle>}
      content={<DetailText>{phoneNumber || t("noPhoneNumber")}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-user-phone-number-edit-button"
          isPending={isUpdateUserPhoneNumberPending}
          isDisabled={isDeleteUserPending}
          onPress={() => onUpdatePhoneNumberModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
