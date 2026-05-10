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
import { useUpdateUserFullName } from "../UpdateUserFullNameContext";

interface UserFullNameDetailInfoAltProps {
  fullName?: string;
  canEdit?: boolean;
}

export function UserFullNameDetailInfoAlt({
  canEdit,
  fullName,
}: UserFullNameDetailInfoAltProps) {
  const t = useTranslations("dashboard.users.UserDetail");

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onUpdateFullNameModalOpenChange } =
    useModal("updateUserFullName");

  //Disable edit button while the user is being deleted
  const { isPending: isDeleteUserPending } = useDeleteUser();

  //Pending state while updating user full name
  const { isPending: isUpdateUserFullNamePending } = useUpdateUserFullName();

  const handlePress = () => {
    guestGuard(() => onUpdateFullNameModalOpenChange(true));
  };

  return (
    <DetailInfoAlt
      data-test="user-full-name-detail-info"
      title={<DetailTitle>{t("fullName")}</DetailTitle>}
      content={<DetailText>{fullName || t("noFullName")}</DetailText>}
      rightSlot={
        canEdit && (
          <DetailEditButton
            data-test="update-user-full-name-edit-button"
            isPending={isUpdateUserFullNamePending}
            isDisabled={isDeleteUserPending}
            onPress={handlePress}
          />
        )
      }
      surface
    />
  );
}
