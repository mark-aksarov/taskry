"use client";

import {
  PersonDetailHeaderImage,
  PersonDetailHeaderImageProps,
} from "@/components/common/PersonDetailHeaderImage";
import { useCurrentUser } from "@/components/common/CurrentUserContext";

interface UserDetailHeaderImageProps
  extends Omit<PersonDetailHeaderImageProps, "canEditImage"> {
  userId: string;
}

export function UserDetailHeaderImage({
  userId,
  ...props
}: UserDetailHeaderImageProps) {
  const { isGuest, isOwner, userId: currentUserId } = useCurrentUser();

  const canEditImage = isOwner || isGuest || userId === currentUserId;

  return <PersonDetailHeaderImage {...props} canEditImage={canEditImage} />;
}
