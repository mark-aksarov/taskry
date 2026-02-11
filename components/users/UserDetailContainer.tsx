"use client";

import useSWR from "swr";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { UserDetail } from "./UserDetail/UserDetail";
import { UserDetailDTO } from "@/lib/data/user/user.dto";
import { UserDetailSkeleton } from "./UserDetail/UserDetailSkeleton";
import { DetailHeader, DetailHeaderSkeleton } from "../common/DetailHeader";
import { PersonDetailHeaderImage } from "../common/PersonDetailHeaderImage";
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
        <DetailHeader
          title={user.fullName}
          image={
            <PersonDetailHeaderImage
              imageUrl={user.imageUrl}
              alt={user.fullName}
            />
          }
          subtitle={user.position ? user.position.name : t("noPosition")}
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
