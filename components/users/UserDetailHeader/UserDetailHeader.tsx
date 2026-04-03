"use client";

import {
  UserDetailHeaderLayout,
  UserDetailHeaderLayoutProps,
} from "./UserDetailHeaderLayout";

import { PersonDetailHeaderImage } from "@/components/common/PersonDetailHeaderImage";

interface UserDetailHeaderProps
  extends Omit<UserDetailHeaderLayoutProps, "imageSlot"> {
  fullName: string;
  imageUrl?: string;
  positionName?: string;
}

export function UserDetailHeader({
  fullName,
  imageUrl,
  positionName,
}: UserDetailHeaderProps) {
  return (
    <UserDetailHeaderLayout
      fullName={fullName}
      imageSlot={<PersonDetailHeaderImage imageUrl={imageUrl} />}
      positionName={positionName}
    />
  );
}
