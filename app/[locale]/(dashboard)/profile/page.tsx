import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ProfilePage } from "./ProfilePage";
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
      userId={userId}
      ProfileDetailContainer={ProfileDetailContainer}
      UserHeaderContainer={UserHeaderContainer}
    />
  );
}
