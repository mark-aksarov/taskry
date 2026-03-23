"use client";

import { useTranslations } from "next-intl";
import { DetailHeader } from "@/components/common/DetailHeader";

export interface UserDetailHeaderLayoutProps {
  fullName: string;
  imageSlot: React.ReactNode;
  positionName?: string;
}

export function UserDetailHeaderLayout({
  fullName,
  imageSlot,
  positionName,
}: UserDetailHeaderLayoutProps) {
  const t = useTranslations("users.UserDetail");

  return (
    <DetailHeader
      title={fullName}
      imageSlot={imageSlot}
      subtitle={positionName ? positionName : t("noPosition")}
    />
  );
}
