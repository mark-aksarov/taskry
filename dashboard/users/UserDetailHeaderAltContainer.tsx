import "server-only";

import {
  UserDetailHeader,
  UserDetailHeaderInteractive,
} from "./UserDetailHeader";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getUserDetail } from "@/lib/data/user/user.dal";
import { canEditUserProfile } from "@/lib/utils/canEditUserProfile";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";
import { verifyProtectedPageSession } from "@/lib/utils/verifyProtectedPageSession";

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

  const session = await verifyProtectedPageSession();
  const canEdit = await canEditUserProfile({ session, profileUserId: userId });

  if (!canEdit) {
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
