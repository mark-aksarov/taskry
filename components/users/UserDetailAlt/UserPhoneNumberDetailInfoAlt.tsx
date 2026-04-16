"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { useUpdateUserPhoneNumber } from "../UpdateUserPhoneNumberContext";

interface UserPhoneNumberDetailInfoAltProps {
  phoneNumber?: string;
}

export function UserPhoneNumberDetailInfoAlt({
  phoneNumber,
}: UserPhoneNumberDetailInfoAltProps) {
  const t = useTranslations("users.UserDetail");

  const { onOpenChange: onUpdatePhoneNumberModalOpenChange } = useModal(
    "updateUserPhoneNumber",
  );

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
          onPress={() => onUpdatePhoneNumberModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
