"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useUpdateUserBio } from "../UpdateUserBioContext";
import { useModal } from "@/components/common/ModalManagerContext";

interface UserBioDetailInfoAltProps {
  bio?: string;
}

export function UserBioDetailInfoAlt({ bio }: UserBioDetailInfoAltProps) {
  const t = useTranslations("users.UserDetail");

  const { onOpenChange: onUpdateBioModalOpenChange } =
    useModal("updateUserBio");

  const { isPending: isUpdateUserBioPending } = useUpdateUserBio();

  return (
    <DetailInfoAlt
      data-test="user-bio-detail-info"
      title={<DetailTitle>{t("bio")}</DetailTitle>}
      content={<DetailText>{bio || t("noBio")}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-user-bio-edit-button"
          isPending={isUpdateUserBioPending}
          onPress={() => onUpdateBioModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
