"use client";

import useSWR from "swr";
import { UserDetailHeader } from "./UserDetailHeader";
import { UserDetailDTO } from "@/lib/data/user/user.dto";
import { DetailHeaderSkeleton } from "../common/DetailHeader";

interface UserDetailHeaderContainerProps {
  userId: string;
}

export function UserDetailHeaderContainer({
  userId,
}: UserDetailHeaderContainerProps) {
  const { data: user, error } = useSWR<UserDetailDTO>(`/api/users/${userId}`, {
    revalidateOnFocus: false,
  });

  if (error) {
    if (error.status === 404) {
      throw new Error(undefined, { cause: "userNotFound" });
    }

    throw new Error();
  }

  // Show skeleton while loading
  if (!user) {
    return <DetailHeaderSkeleton />;
  }

  return (
    <UserDetailHeader
      fullName={user.fullName}
      imageUrl={user.imageUrl}
      canUpdateImage={false}
      positionName={user.position?.name}
    />
  );
}
