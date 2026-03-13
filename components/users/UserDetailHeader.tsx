import React from "react";
import { useTranslations } from "next-intl";
import { DetailHeader } from "@/components/common/DetailHeader";

interface UserDetailHeaderProps {
  fullName: string;
  imageSlot: React.ReactNode;
  positionName?: string;
}

export function UserDetailHeader({
  fullName,
  imageSlot,
  positionName,
}: UserDetailHeaderProps) {
  const t = useTranslations("users.UserDetailHeader");

  return (
    <DetailHeader
      title={fullName}
      imageSlot={imageSlot}
      subtitle={positionName ? positionName : t("noPosition")}
    />
  );
}
