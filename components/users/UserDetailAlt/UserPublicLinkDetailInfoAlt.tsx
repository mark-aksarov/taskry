"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { useUpdateUserPublicLink } from "../UpdateUserPublicLinkContext";

interface UserPublicLinkDetailInfoAltProps {
  publicLink?: string;
}

export function UserPublicLinkDetailInfoAlt({
  publicLink,
}: UserPublicLinkDetailInfoAltProps) {
  const t = useTranslations("users.UserDetail");

  const { onOpenChange: onUpdatePublicLinkModalOpenChange } = useModal(
    "updateUserPublicLink",
  );

  const { isPending: isUpdateUserPublicLinkPending } =
    useUpdateUserPublicLink();

  return (
    <DetailInfoAlt
      data-test="user-public-link-detail-info"
      title={<DetailTitle>{t("publicLink")}</DetailTitle>}
      content={<DetailText>{publicLink || t("noPublicLink")}</DetailText>}
      editButton={
        <DetailEditButton
          data-test="update-user-public-link-edit-button"
          isPending={isUpdateUserPublicLinkPending}
          onPress={() => onUpdatePublicLinkModalOpenChange(true)}
        />
      }
    />
  );
}
