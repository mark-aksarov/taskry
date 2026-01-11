"use client";

import useSWR from "swr";
import { useTranslations } from "next-intl";
import { UserDetail } from "./UserDetail/UserDetail";
import { PersonHeader } from "../common/PersonHeader";
import { UserDetailDTO } from "@/lib/data/user/user.dto";
import { PersonDetailPresentation } from "../common/PersonDetailPresentation";

interface UserDetailContainerProps {
  userId: string;
}

export function UserDetailContainer({ userId }: UserDetailContainerProps) {
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
