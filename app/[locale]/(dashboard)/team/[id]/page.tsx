import { Suspense } from "react";
import { TeamProfilePage } from "./TeamProfilePage";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { ProfileDetailContainer } from "@/components/users/ProfileDetailContainer";

export default async function AppProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();

  const { id } = await params;

  return (
    <TeamProfilePage
      profileDetailContainer={
        <Suspense fallback={<UserDetailSkeleton />}>
          <ProfileDetailContainer userId={id} />
        </Suspense>
      }
      userHeaderContainer={<UserHeaderContainer userId={id} />}
    />
  );
}
