import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { getUserDetail } from "@/lib/data/user/user.dal";
import { UserDetailAlt, UserDetailAltSkeleton } from "./UserDetailAlt";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";

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

  const session = await requireProtectedPage();
  const isOwner = await hasOwnerRole();
  const isGuest = await hasGuestRole();

  const currentUserId = session.user.id;
  const canEdit = isOwner || isGuest || userId === currentUserId;

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
      canEdit={canEdit}
    />
  );
}
