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
import { useUpdateUserBio } from "../UpdateUserBioContext";

interface UserBioDetailInfoAltProps {
  bio?: string;
}

export function UserBioDetailInfoAlt({ bio }: UserBioDetailInfoAltProps) {
  const t = useTranslations("dashboard.users.UserDetail");

  const { onOpenChange: onUpdateBioModalOpenChange } =
    useModal("updateUserBio");

  //Disable edit button while the user is being deleted
  const { isPending: isDeleteUserPending } = useDeleteUser();

  //Pending state while updating user bio
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
          isDisabled={isDeleteUserPending}
          onPress={() => onUpdateBioModalOpenChange(true)}
        />
      }
      surface
    />
  );
}
