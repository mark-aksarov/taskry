import React from "react";
import { useTranslations } from "next-intl";
import { UserImageMenuTrigger } from "./UserImageMenuTrigger";
import { DetailHeader } from "@/components/common/DetailHeader";
import { PersonDetailHeaderImage } from "../common/PersonDetailHeaderImage";

interface UserDetailHeaderProps {
  fullName: string;
  imageUrl?: string;
  positionName?: string;
  canUpdateImage: boolean;
}

export function UserDetailHeader({
  fullName,
  imageUrl,
  canUpdateImage,
  positionName,
}: UserDetailHeaderProps) {
  const t = useTranslations("users.UserDetailHeader");

  return (
    <DetailHeader
      title={fullName}
      imageSlot={
        canUpdateImage ? (
          <>
            <UserImageMenuTrigger>
              <PersonDetailHeaderImage alt={fullName} imageUrl={imageUrl} />
            </UserImageMenuTrigger>
          </>
        ) : (
          <PersonDetailHeaderImage alt={fullName} imageUrl={imageUrl} />
        )
      }
      subtitle={positionName ? positionName : t("noPosition")}
    />
  );
}
