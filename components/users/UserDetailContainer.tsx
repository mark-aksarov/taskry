"use client";

import useSWR from "swr";
import { UserDetail } from "./UserDetail/UserDetail";
import { UserDetailDTO } from "@/lib/data/user/user.dto";
import { UserDetailSkeleton } from "./UserDetail/UserDetailSkeleton";

interface UserDetailContainerProps {
  userId: string;
}

export function UserDetailContainer({ userId }: UserDetailContainerProps) {
  const { data: user, error } = useSWR<UserDetailDTO>(`/api/users/${userId}`);

  if (error) {
    throw new Error();
  }

  // Show skeleton while loading
  if (!user) {
    return <UserDetailSkeleton />;
  }

  return (
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
  );
}
