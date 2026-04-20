"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/dashboard/common/ModalManagerContext";
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
          onPress={() => onUpdateFullNameModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
