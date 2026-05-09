"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useDeleteUser } from "../DeleteUserContext";
import { useModal } from "@/common/ModalManagerContext";
import { useFormatter, useTranslations } from "next-intl";
import { useUpdateUserBirthdate } from "../UpdateUserBirthdateContext";

interface UserBirthdateDetailInfoAltProps {
  birthdate?: string;
}

export function UserBirthdateDetailInfoAlt({
  birthdate,
}: UserBirthdateDetailInfoAltProps) {
  const t = useTranslations("dashboard.users.UserDetail");

  const { onOpenChange: onUpdateBirthdateModalOpenChange } = useModal(
    "updateUserBirthdate",
  );

  //Disable edit button while the user is being deleted
  const { isPending: isDeleteUserPending } = useDeleteUser();

  //Pending state while updating user birthdate
  const { isPending: isUpdateUserBirthdatePending } = useUpdateUserBirthdate();

  const format = useFormatter();

  const formattedBirthdate = birthdate
    ? format.dateTime(new Date(birthdate), {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : t("noBirthdate");

  return (
    <DetailInfoAlt
      className="border-none pb-0"
      data-test="user-birthdate-detail-info"
      title={<DetailTitle>{t("birthdate")}</DetailTitle>}
      content={<DetailText>{formattedBirthdate}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-user-birthdate-edit-button"
          isPending={isUpdateUserBirthdatePending}
          isDisabled={isDeleteUserPending}
          onPress={() => onUpdateBirthdateModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
