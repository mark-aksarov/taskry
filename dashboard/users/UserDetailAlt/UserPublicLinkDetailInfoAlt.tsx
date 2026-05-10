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
import { useUpdateUserPublicLink } from "../UpdateUserPublicLinkContext";

interface UserPublicLinkDetailInfoAltProps {
  publicLink?: string;
}

export function UserPublicLinkDetailInfoAlt({
  publicLink,
}: UserPublicLinkDetailInfoAltProps) {
  const t = useTranslations("dashboard.users.UserDetail");

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onUpdatePublicLinkModalOpenChange } = useModal(
    "updateUserPublicLink",
  );

  //Disable edit button while the user is being deleted
  const { isPending: isDeleteUserPending } = useDeleteUser();

  //Pending state while updating user public link
  const { isPending: isUpdateUserPublicLinkPending } =
    useUpdateUserPublicLink();

  const handlePress = () => {
    guestGuard(() => onUpdatePublicLinkModalOpenChange(true));
  };

  return (
    <DetailInfoAlt
      data-test="user-public-link-detail-info"
      title={<DetailTitle>{t("publicLink")}</DetailTitle>}
      content={<DetailText>{publicLink || t("noPublicLink")}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-user-public-link-edit-button"
          isPending={isUpdateUserPublicLinkPending}
          isDisabled={isDeleteUserPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
