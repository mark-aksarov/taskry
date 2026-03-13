import "server-only";

import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { UserDetailHeader } from "./UserDetailHeader";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { getUserDetail } from "@/lib/data/user/user.dal";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { createPresignedUrl } from "@/lib/actions/s3/createPresignedUrl";
import { updateUserImageUrl } from "@/lib/actions/user/updateUserImageUrl";

interface UserDetailHeaderContainerProps {
  userId: string;
}

export function UserDetailHeaderContainer(
  props: UserDetailHeaderContainerProps,
) {
  return (
    <Suspense fallback={<DetailHeaderSkeleton />}>
      <UserDetailHeaderContainerInner {...props} />
    </Suspense>
  );
}

async function UserDetailHeaderContainerInner({
  userId,
}: UserDetailHeaderContainerProps) {
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

  return (
    <UserDetailHeader
      userId={user.id}
      fullName={user.fullName}
      imageUrl={user.imageUrl}
      canUpdateImage={canUpdateImage}
      positionName={user.position?.name}
      createPresignedUrl={createPresignedUrl}
      updateUserImageUrl={updateUserImageUrl}
    />
  );
}
