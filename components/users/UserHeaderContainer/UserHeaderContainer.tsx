import "server-only";

import {
  PersonHeader,
  PersonHeaderSkeleton,
} from "@/components/common/PersonHeader";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getUserDetail } from "@/lib/data/user/user.service";

interface UserHeaderContainerProps {
  userId: string;
}

export function UserHeaderContainer(props: UserHeaderContainerProps) {
  return (
    <Suspense fallback={<PersonHeaderSkeleton />}>
      <UserHeaderContainerInner {...props} />
    </Suspense>
  );
}

async function UserHeaderContainerInner({ userId }: UserHeaderContainerProps) {
  const t = useTranslations("users.UserHeaderContainer");

  const user = await getUserDetail(userId);

  if (!user) {
    notFound();
  }

  return (
    <PersonHeader
      title={user.fullName}
      imageUrl={user.imageUrl}
      subtitle={user.position ? user.position.name : t("unknownPosition")}
    />
  );
}
