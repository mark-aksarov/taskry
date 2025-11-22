"use client";

import useSWR from "swr";
import { GetUserDetailsType } from "@/lib/queries/user";
import { UserDetail } from "@/components/users/UserDetail";
import { UserHeader } from "@/components/users/UserHeader";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface UserDetailClientContainerProps {
  userId: string;
}

export function UserDetailClientContainer({
  userId,
}: UserDetailClientContainerProps) {
  const { data: user } = useSWR<GetUserDetailsType>(
    `/api/users/${userId}`,
    fetcher,
    { suspense: true },
  );

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6">
      <UserHeader
        fullName={user.fullName}
        imageUrl={user.imageUrl ?? undefined}
        position={user.position ? { name: user.position.name } : undefined}
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
