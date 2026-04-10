import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getUserDetail } from "@/lib/data/user/user.dal";
import { UserDetailAlt, UserDetailAltSkeleton } from "./UserDetailAlt";

interface UserDetailAltContainerProps {
  userId: string;
}

export function UserDetailAltContainer(props: UserDetailAltContainerProps) {
  return (
    <Suspense fallback={<UserDetailAltSkeleton />}>
      <UserDetailAltContainerInner {...props} />
    </Suspense>
  );
}

async function UserDetailAltContainerInner({
  userId,
}: UserDetailAltContainerProps) {
  const user = await getUserDetail(userId);

  if (!user) {
    notFound();
  }

  return (
    <UserDetailAlt
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
