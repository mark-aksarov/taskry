"use client";

import useSWR from "swr";
import { useTranslations } from "next-intl";
import { UserDetailDTO } from "@/lib/data/user/user.dto";
import { UserDetail } from "@/components/users/UserDetail";
import { PersonHeader } from "@/components/common/PersonHeader";

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
