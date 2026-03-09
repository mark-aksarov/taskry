"use client";

import useSWR from "swr";
import { UserDetail } from "./UserDetail/UserDetail";
import { UserDetailHeader } from "./UserDetailHeader";
import { UserDetailDTO } from "@/lib/data/user/user.dto";
import { DetailHeaderSkeleton } from "../common/DetailHeader";
import { UserDetailSkeleton } from "./UserDetail/UserDetailSkeleton";
import { PersonDetailPresentation } from "../common/PersonDetailPresentation";

interface UserDetailContainerProps {
  userId: string;
}

export function UserDetailContainer({ userId }: UserDetailContainerProps) {
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
    return (
      <PersonDetailPresentation
        personHeader={<DetailHeaderSkeleton />}
        userDetail={<UserDetailSkeleton />}
      />
    );
  }

  return (
    <PersonDetailPresentation
      personHeader={
        <UserDetailHeader
          fullName={user.fullName}
          imageUrl={user.imageUrl}
          positionName={user.position?.name}
        />
      }
      userDetail={
        <UserDetail
          id={user.id}
          fullName={user.fullName}
          bio={user.bio}
          email={user.email}
          phoneNumber={user.phoneNumber}
          address={user.address}
          publicLink={user.publicLink}
          birthdate={user.birthdate}
          position={user.position}
        />
      }
    />
  );
}
