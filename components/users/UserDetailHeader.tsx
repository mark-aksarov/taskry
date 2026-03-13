import {
  ActionFn,
  ActionState,
  CreatePresignedUrlState,
  UpdateUserImageUrlPayload,
} from "@/lib/actions/types";

import React from "react";
import { useTranslations } from "next-intl";
import { UserImageModal } from "./UserImageModal";
import { UserImageMenuTrigger } from "./UserImageMenuTrigger";
import { DetailHeader } from "@/components/common/DetailHeader";
import { UpdateUserImageProvider } from "./UpdateUserImageContext";
import { PersonDetailHeaderImage } from "../common/PersonDetailHeaderImage";

interface UserDetailHeaderProps {
  userId: string;
  fullName: string;
  imageUrl?: string;
  positionName?: string;
  canUpdateImage: boolean;
  createPresignedUrl: ActionFn<CreatePresignedUrlState, void>;
  updateUserImageUrl: ActionFn<ActionState, UpdateUserImageUrlPayload>;
}

export function UserDetailHeader({
  userId,
  fullName,
  imageUrl,
  canUpdateImage,
  positionName,
  createPresignedUrl,
  updateUserImageUrl,
}: UserDetailHeaderProps) {
  const t = useTranslations("users.UserDetailHeader");

  return (
    <DetailHeader
      title={fullName}
      imageSlot={
        canUpdateImage ? (
          <UpdateUserImageProvider
            createPresignedUrl={createPresignedUrl}
            updateUserImageUrl={updateUserImageUrl}
          >
            <UserImageMenuTrigger>
              <PersonDetailHeaderImage alt={fullName} imageUrl={imageUrl} />
            </UserImageMenuTrigger>

            <UserImageModal userId={userId} />
          </UpdateUserImageProvider>
        ) : (
          <PersonDetailHeaderImage alt={fullName} imageUrl={imageUrl} />
        )
      }
      subtitle={positionName ? positionName : t("noPosition")}
    />
  );
}
