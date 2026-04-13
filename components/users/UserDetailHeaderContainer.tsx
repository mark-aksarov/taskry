"use client";

import {
  UserDetailHeader,
  UserDetailHeaderInteractive,
} from "./UserDetailHeader";

import useSWR from "swr";
import { UserDetailDTO } from "@/lib/data/user/user.dto";
import { DetailHeaderSkeleton } from "../common/DetailHeader";
import { useCurrentUser } from "../common/CurrentUserContext";

interface UserDetailHeaderContainerProps {
  userId: string;
}

export function UserDetailHeaderContainer({
  userId,
}: UserDetailHeaderContainerProps) {
  const { data: user, error } = useSWR<UserDetailDTO>(`/api/users/${userId}`);
  const { isOwner, isGuest, userId: currentUserId } = useCurrentUser();

  if (error) {
    throw new Error();
  }

  // Show skeleton while loading
  if (!user) {
    return <DetailHeaderSkeleton />;
  }

  const canUpdateImage = isOwner || isGuest || userId === currentUserId;

  if (!canUpdateImage) {
    return (
      <UserDetailHeader
        fullName={user.fullName}
        imageUrl={user.imageUrl}
        positionName={user.position?.name}
      />
    );
  }

  return (
    <UserDetailHeaderInteractive
      fullName={user.fullName}
      imageUrl={user.imageUrl}
      positionName={user.position?.name}
    />
  );
}
