import "server-only";

import {
  UserDetailHeader,
  UserDetailHeaderInteractive,
} from "./UserDetailHeader";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getUserDetail } from "@/lib/data/user/user.dal";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";

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

  const session = await requireProtectedPage();
  const isOwner = session.user.role === "owner";
  const isGuest = session.user.role === "guest";

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
