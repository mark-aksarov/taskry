"use client";

import {
  UserDetailHeaderLayout,
  UserDetailHeaderLayoutProps,
} from "./UserDetailHeaderLayout";

import { UserImageMenuTrigger } from "../UserImageMenuTrigger";
import { PersonDetailHeaderImage } from "@/components/common/PersonDetailHeaderImage";

interface UserDetailHeaderInteractiveProps
  extends Omit<UserDetailHeaderLayoutProps, "imageSlot"> {
  fullName: string;
  imageUrl?: string;
  positionName?: string;
}

export function UserDetailHeaderInteractive({
  fullName,
  imageUrl,
  positionName,
}: UserDetailHeaderInteractiveProps) {
  return (
    <UserDetailHeaderLayout
      fullName={fullName}
      imageSlot={
        <UserImageMenuTrigger showDeleteMenuItem={!!imageUrl}>
          <PersonDetailHeaderImage alt={fullName} imageUrl={imageUrl} />
        </UserImageMenuTrigger>
      }
      positionName={positionName}
    />
  );
}
