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

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onUpdatePositionModalOpenChange } =
    useModal("updateUserPosition");

  //Disable edit button while the user is being deleted
  const { isPending: isDeleteUserPending } = useDeleteUser();

  //Pending state while updating user position
  const { isPending: isUpdateUserPositionPending } = useUpdateUserPosition();

  const handlePress = () => {
    guestGuard(() => onUpdatePositionModalOpenChange(true));
  };

  return (
    <DetailInfoAlt
      data-test="user-position-detail-info"
      title={<DetailTitle>{t("position")}</DetailTitle>}
      content={<DetailText>{position?.name || t("noPosition")}</DetailText>}
      rightSlot={
        <DetailEditButton
          data-test="update-user-position-edit-button"
          isPending={isUpdateUserPositionPending}
          isDisabled={isDeleteUserPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
