import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ProfilePage } from "./ProfilePage";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { ProfileDetailContainer } from "@/components/users/ProfileDetailContainer";

export default async function AppProfilePage() {
  await requireProtectedPage();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { id: userId } = session!.user;

  return (
    <ProfilePage
      profileDetailContainer={
        <Suspense fallback={<UserDetailSkeleton />}>
          <ProfileDetailContainer userId={userId} />
        </Suspense>
      }
      userHeaderContainer={
        <Suspense fallback={<PersonHeaderSkeleton />}>
          <UserHeaderContainer userId={userId} />
        </Suspense>
      }
    />
  );
}
