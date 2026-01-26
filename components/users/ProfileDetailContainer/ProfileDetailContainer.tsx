import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getUserDetail } from "@/lib/data/user/user.service";
import { UserDetail, UserDetailSkeleton } from "../UserDetail";

interface ProfileDetailContainerProps {
  userId: string;
}

export function ProfileDetailContainer(props: ProfileDetailContainerProps) {
  return (
    <Suspense fallback={<UserDetailSkeleton />}>
      <ProfileDetailContainerInner {...props} />
    </Suspense>
  );
}

async function ProfileDetailContainerInner({
  userId,
}: ProfileDetailContainerProps) {
  const user = await getUserDetail(userId);

  if (!user) {
    notFound();
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
