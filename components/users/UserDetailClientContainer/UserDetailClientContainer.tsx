"use client";

import useSWR from "swr";
import { useTranslations } from "next-intl";
import { UserDetailDTO } from "@/lib/dto/user";
import { UserDetail } from "@/components/users/UserDetail";
import { PersonHeader } from "@/components/common/PersonHeader";

interface UserDetailClientContainerProps {
  userId: string;
}

export function UserDetailClientContainer({
  userId,
}: UserDetailClientContainerProps) {
  const t = useTranslations("users.UserDetailClientContainer");

  const { data: user } = useSWR<UserDetailDTO>(`/api/users/${userId}`, {
    suspense: true,
  });

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6">
      <PersonHeader
        title={user.fullName}
        imageUrl={user.imageUrl ?? undefined}
        subtitle={user.position ? user.position.name : t("unknownPosition")}
      />
      <UserDetail
        id={user.id}
        fullName={user.fullName}
        bio={user.bio ?? undefined}
        email={user.email}
        phoneNumber={user.phoneNumber ?? undefined}
        address={user.address ?? undefined}
        publicLink={user.publicLink ?? undefined}
        birthdate={user.birthdate ?? undefined}
        position={user.position ?? undefined}
      />
    </div>
  );
}
