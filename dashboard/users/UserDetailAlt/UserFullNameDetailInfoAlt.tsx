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
import { useUpdateUserFullName } from "../UpdateUserFullNameContext";

interface UserFullNameDetailInfoAltProps {
  fullName?: string;
}

export function UserFullNameDetailInfoAlt({
  fullName,
}: UserFullNameDetailInfoAltProps) {
  const t = useTranslations("dashboard.users.UserDetail");

  const { onOpenChange: onUpdateFullNameModalOpenChange } =
    useModal("updateUserFullName");

  //Disable edit button while the user is being deleted
  const { isPending: isDeleteUserPending } = useDeleteUser();

  //Pending state while updating user full name
  const { isPending: isUpdateUserFullNamePending } = useUpdateUserFullName();

  return (
    <DetailInfoAlt
      data-test="user-full-name-detail-info"
      title={<DetailTitle>{t("fullName")}</DetailTitle>}
      content={<DetailText>{fullName || t("noFullName")}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-user-full-name-edit-button"
          isPending={isUpdateUserFullNamePending}
          isDisabled={isDeleteUserPending}
          onPress={() => onUpdateFullNameModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
