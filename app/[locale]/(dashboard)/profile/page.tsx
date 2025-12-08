import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ProfilePage } from "./ProfilePage";
import { UserHeaderServerContainer } from "@/components/users/UserHeaderServerContainer";
import { UserDetailServerContainer } from "@/components/users/UserDetailServerContainer";

export default async function AppProfilePage() {
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
