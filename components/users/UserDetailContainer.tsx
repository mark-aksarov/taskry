"use client";

import useSWR from "swr";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { UserDetail } from "./UserDetail/UserDetail";
import { UserDetailHeader } from "./UserDetailHeader";
import { UserDetailDTO } from "@/lib/data/user/user.dto";
import { UserDetailSkeleton } from "./UserDetail/UserDetailSkeleton";
import { DetailHeader, DetailHeaderSkeleton } from "../common/DetailHeader";
import { PersonDetailPresentation } from "../common/PersonDetailPresentation";

interface UserDetailContainerProps {
  userId: string;
}

export function UserDetailContainer(props: UserDetailContainerProps) {
  return (
    <Suspense
      fallback={
        <PersonDetailPresentation
          personHeader={<DetailHeaderSkeleton />}
          userDetail={<UserDetailSkeleton />}
        />
      }
    >
      <UserDetailContainerInner {...props} />
    </Suspense>
  );
}

function UserDetailContainerInner({ userId }: UserDetailContainerProps) {
  const { data: user } = useSWR<UserDetailDTO>(`/api/users/${userId}`, {
    suspense: true,
  });

  if (!user) {
    throw new Error("User not found");
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
