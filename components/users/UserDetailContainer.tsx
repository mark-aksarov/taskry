"use client";

import useSWR from "swr";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { UserDetail } from "./UserDetail/UserDetail";
import { UserDetailDTO } from "@/lib/data/user/user.dto";
import { UserDetailSkeleton } from "./UserDetail/UserDetailSkeleton";
import { PersonHeader, PersonHeaderSkeleton } from "../common/PersonHeader";
import { PersonDetailPresentation } from "../common/PersonDetailPresentation";

interface UserDetailContainerProps {
  userId: string;
}

export function UserDetailContainer(props: UserDetailContainerProps) {
  return (
    <Suspense
      fallback={
        <PersonDetailPresentation
          personHeader={<PersonHeaderSkeleton />}
          userDetail={<UserDetailSkeleton />}
        />
      }
    >
      <UserDetailContainerInner {...props} />
    </Suspense>
  );
}

function UserDetailContainerInner({ userId }: UserDetailContainerProps) {
  const t = useTranslations("users.UserDetailContainer");

  const { data: user } = useSWR<UserDetailDTO>(`/api/users/${userId}`, {
    suspense: true,
  });

  if (!user) {
    throw new Error("User not found");
  }

  return (
    <PersonDetailPresentation
      personHeader={
        <PersonHeader
          title={user.fullName}
          imageUrl={user.imageUrl}
          subtitle={user.position ? user.position.name : t("unknownPosition")}
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
