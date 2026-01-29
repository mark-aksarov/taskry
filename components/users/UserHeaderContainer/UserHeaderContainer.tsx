import "server-only";

import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getUserDetail } from "@/lib/data/user/user.service";
import { PersonDetailHeaderImage } from "@/components/common/PersonDetailHeaderImage";

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
  const t = useTranslations("users.UserHeaderContainer");

  const user = await getUserDetail(userId);

  if (!user) {
    notFound();
  }

  return (
    <DetailHeader
      title={user.fullName}
      image={
        <PersonDetailHeaderImage alt={user.fullName} imageUrl={user.imageUrl} />
      }
      subtitle={user.position ? user.position.name : t("unknownPosition")}
    />
  );
}
