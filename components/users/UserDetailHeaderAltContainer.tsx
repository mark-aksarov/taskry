import "server-only";

import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { UserDetailHeader } from "./UserDetailHeader";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { getUserDetail } from "@/lib/data/user/user.dal";
import { UpdateUserImageProvider } from "./UpdateUserImageContext";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { createPresignedUrl } from "@/lib/actions/s3/createPresignedUrl";
import { updateUserImageUrl } from "@/lib/actions/user/updateUserImageUrl";
import { DeleteUserImageProvider } from "./DeleteUserImageContext/DeleteUserImageContext";

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

  return (
    <UpdateUserImageProvider
      createPresignedUrl={createPresignedUrl}
      updateUserImageUrl={updateUserImageUrl}
    >
      <DeleteUserImageProvider updateUserImageUrl={updateUserImageUrl}>
        <UserDetailHeader
          userId={user.id}
          fullName={user.fullName}
          imageUrl={user.imageUrl}
          canUpdateImage={canUpdateImage}
          positionName={user.position?.name}
        />
      </DeleteUserImageProvider>
    </UpdateUserImageProvider>
  );
}
