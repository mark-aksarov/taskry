import "server-only";

import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { UserImageModal } from "./UserImageModal";
import { UserDetailHeader } from "./UserDetailHeader";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { getUserDetail } from "@/lib/data/user/user.dal";
import { UserImageMenuTrigger } from "./UserImageMenuTrigger";
import { UpdateUserImageProvider } from "./UpdateUserImageContext";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { createPresignedUrl } from "@/lib/actions/s3/createPresignedUrl";
import { updateUserImageUrl } from "@/lib/actions/user/updateUserImageUrl";
import { PersonDetailHeaderImage } from "../common/PersonDetailHeaderImage";

interface UserHeaderContainerProps {
  userId: string;
}

export function UserHeaderContainer(props: UserHeaderContainerProps) {
  return (
    <Suspense fallback={<DetailHeaderSkeleton />}>
      <UserHeaderContainerInner {...props} />
    </Suspense>
  );
}

async function UserHeaderContainerInner({ userId }: UserHeaderContainerProps) {
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

  const canEditImage = isOwner || isGuest || userId === currentUserId;

  return (
    <UserDetailHeader
      fullName={user.fullName}
      imageSlot={
        canEditImage ? (
          <UpdateUserImageProvider
            createPresignedUrl={createPresignedUrl}
            updateUserImageUrl={updateUserImageUrl}
          >
            <UserImageMenuTrigger>
              <PersonDetailHeaderImage
                alt={user.fullName}
                imageUrl={user.imageUrl}
              />
            </UserImageMenuTrigger>

            <UserImageModal userId={userId} />
          </UpdateUserImageProvider>
        ) : (
          <PersonDetailHeaderImage
            alt={user.fullName}
            imageUrl={user.imageUrl}
          />
        )
      }
      positionName={user.position?.name}
    />
  );
}
