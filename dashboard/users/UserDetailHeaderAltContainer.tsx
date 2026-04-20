import "server-only";

import {
  UserDetailHeader,
  UserDetailHeaderInteractive,
} from "./UserDetailHeader";

import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { getUserDetail } from "@/lib/data/user/user.dal";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";

interface UserDetailHeaderAltContainerProps {
  userId: string;
}

export function UserDetailHeaderAltContainer(
  props: UserDetailHeaderAltContainerProps,
) {
  return (
    <Suspense fallback={<DetailHeaderSkeleton />}>
      <UserDetailHeaderAltContainerInner {...props} />
    </Suspense>
  );
}

async function UserDetailHeaderAltContainerInner({
  userId,
}: UserDetailHeaderAltContainerProps) {
  const user = await getUserDetail(userId);

  if (!user) {
    notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error();
  }

  const isOwner = await hasOwnerRole();
  const isGuest = await hasGuestRole();
  const currentUserId = session.user.id;

  const canUpdateImage = isOwner || isGuest || userId === currentUserId;

  if (!canUpdateImage) {
    return (
      <UserDetailHeader
        fullName={user.fullName}
        imageUrl={user.imageUrl}
        positionName={user.position?.name}
      />
    );
  }

  return (
    <UserDetailHeaderInteractive
      fullName={user.fullName}
      imageUrl={user.imageUrl}
      positionName={user.position?.name}
    />
  );
}
