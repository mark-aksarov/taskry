import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ProfilePage } from "./ProfilePage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UserHeaderServerContainer } from "@/components/users/UserHeaderServerContainer";
import { UserDetailServerContainer } from "@/components/users/UserDetailServerContainer";

export default async function AppProfilePage() {
  await requireProtectedPage();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { id: userId } = session!.user;

  return (
    <ProfilePage
      userId={userId}
      UserDetailContainer={UserDetailServerContainer}
      UserHeaderContainer={UserHeaderServerContainer}
    />
  );
}
