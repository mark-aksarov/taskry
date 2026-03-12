import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { UserDetailHeader } from "./UserDetailHeader";
import { getUserDetail } from "@/lib/data/user/user.dal";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";

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

  return (
    <UserDetailHeader
      userId={user.id}
      fullName={user.fullName}
      imageUrl={user.imageUrl}
      positionName={user.position?.name}
    />
  );
}
