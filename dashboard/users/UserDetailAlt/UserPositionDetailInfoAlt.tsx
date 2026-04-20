"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { useUpdateUserPosition } from "../UpdateUserPositionContext";

interface UserPositionDetailInfoAltProps {
  position?: {
    name: string;
  };
}

export function UserPositionDetailInfoAlt({
  position,
}: UserPositionDetailInfoAltProps) {
  const t = useTranslations("dashboard.users.UserDetail");

  const { onOpenChange: onUpdatePositionModalOpenChange } =
    useModal("updateUserPosition");

  const { isPending: isUpdateUserPositionPending } = useUpdateUserPosition();

  return (
    <DetailInfoAlt
      data-test="user-position-detail-info"
      title={<DetailTitle>{t("position")}</DetailTitle>}
      content={<DetailText>{position?.name || t("noPosition")}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-user-position-edit-button"
          isPending={isUpdateUserPositionPending}
          onPress={() => onUpdatePositionModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
