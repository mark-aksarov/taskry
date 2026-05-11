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
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useUpdateUserPhoneNumber } from "../UpdateUserPhoneNumberContext";

interface UserPhoneNumberDetailInfoAltProps {
  phoneNumber?: string;
  canEdit?: boolean;
}

export function UserPhoneNumberDetailInfoAlt({
  phoneNumber,
  canEdit,
}: UserPhoneNumberDetailInfoAltProps) {
  const t = useTranslations("dashboard.users.UserDetail");

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onUpdatePhoneNumberModalOpenChange } = useModal(
    "updateUserPhoneNumber",
  );

  //Disable edit button while the user is being deleted
  const { isPending: isDeleteUserPending } = useDeleteUser();

  //Pending state while updating user phone number
  const { isPending: isUpdateUserPhoneNumberPending } =
    useUpdateUserPhoneNumber();

  const handlePress = () => {
    guestGuard(() => onUpdatePhoneNumberModalOpenChange(true));
  };

  return (
    <DetailInfoAlt
      data-test="user-phone-number-detail-info"
      title={<DetailTitle>{t("phoneNumber")}</DetailTitle>}
      content={<DetailText>{phoneNumber || t("noPhoneNumber")}</DetailText>}
      rightSlot={
        canEdit && (
          <DetailEditButton
            aria-label={t("editPhoneNumberButtonLabel")}
            data-test="edit-phone-number-button"
            isPending={isUpdateUserPhoneNumberPending}
            isDisabled={isDeleteUserPending}
            onPress={handlePress}
          />
        )
      }
      surface
    />
  );
}
