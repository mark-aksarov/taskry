"use client";

import {
  UserDetailHeaderLayout,
  UserDetailHeaderLayoutProps,
} from "./UserDetailHeaderLayout";

import {
  DeleteUserImageModal,
  DeleteUserImageModalProvider,
} from "../DeleteUserImageModal";

import { UpdateUserImageModal } from "../UpdateUserImageModal";
import { UserImageMenuTrigger } from "../UserImageMenuTrigger";
import { PersonDetailHeaderImage } from "@/components/common/PersonDetailHeaderImage";

interface UserDetailHeaderInteractiveProps
  extends Omit<UserDetailHeaderLayoutProps, "imageSlot"> {
  userId: string;
  fullName: string;
  imageUrl?: string;
  positionName?: string;
}

export function UserDetailHeaderInteractive({
  userId,
  fullName,
  imageUrl,
  positionName,
}: UserDetailHeaderInteractiveProps) {
  return (
    <DeleteUserImageModalProvider>
      <UserDetailHeaderLayout
        fullName={fullName}
        imageSlot={
          <UserImageMenuTrigger>
            <PersonDetailHeaderImage alt={fullName} imageUrl={imageUrl} />
          </UserImageMenuTrigger>
        }
        positionName={positionName}
      />

      <UpdateUserImageModal userId={userId} />
      <DeleteUserImageModal userId={userId} userFullName={fullName} />
    </DeleteUserImageModalProvider>
  );
}
