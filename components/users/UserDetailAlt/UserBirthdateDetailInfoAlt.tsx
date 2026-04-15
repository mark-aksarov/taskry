"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useFormatter, useTranslations } from "next-intl";
import { useUpdateUserBirthdate } from "../UpdateUserBirthdateContext";
import { useModal } from "@/components/common/ModalManagerContext";

interface UserBirthdateDetailInfoAltProps {
  birthdate?: string;
}

export function UserBirthdateDetailInfoAlt({
  birthdate,
}: UserBirthdateDetailInfoAltProps) {
  const t = useTranslations("users.UserDetail");

  const { onOpenChange: onUpdateBirthdateModalOpenChange } = useModal(
    "updateUserBirthdate",
  );

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
      editButton={
        <DetailEditButton
          data-test="update-user-birthdate-edit-button"
          isPending={isUpdateUserBirthdatePending}
          onPress={() => onUpdateBirthdateModalOpenChange(true)}
        />
      }
    />
  );
}
