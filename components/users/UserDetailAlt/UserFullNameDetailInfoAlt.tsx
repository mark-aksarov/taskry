"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { useUpdateUserFullName } from "../UpdateUserFullNameContext";

interface UserFullNameDetailInfoAltProps {
  fullName?: string;
}

export function UserFullNameDetailInfoAlt({
  fullName,
}: UserFullNameDetailInfoAltProps) {
  const t = useTranslations("users.UserDetail");

  const { onOpenChange: onUpdateFullNameModalOpenChange } =
    useModal("updateUserFullName");

  const { isPending: isUpdateUserFullNamePending } = useUpdateUserFullName();

  return (
    <DetailInfoAlt
      data-test="user-full-name-detail-info"
      title={<DetailTitle>{t("fullName")}</DetailTitle>}
      text={<DetailText>{fullName || t("noFullName")}</DetailText>}
      editButton={
        <DetailEditButton
          data-test="update-user-full-name-edit-button"
          isPending={isUpdateUserFullNamePending}
          onPress={() => onUpdateFullNameModalOpenChange(true)}
        />
      }
    />
  );
}
