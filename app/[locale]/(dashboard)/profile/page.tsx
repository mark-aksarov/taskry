import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ProfilePage } from "./ProfilePage";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { changePassword } from "@/lib/actions/user/changePassword";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { EditUserFormContainer } from "@/components/users/EditUserFormContainer";
import { ProfileDetailContainer } from "@/components/users/ProfileDetailContainer";
import { ProfileActions } from "@/components/users/ProfileActions";

export default async function AppProfilePage() {
  await requireProtectedPage();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { id: userId } = session!.user;

  const guestMode = await hasGuestRole();

  return (
    <ProfilePage
      profileActions={
        <ProfileActions
          guestMode={guestMode}
          userId={userId}
          changePassword={changePassword}
          editUserFormContainer={<EditUserFormContainer userId={userId} />}
        />
      }
      profileDetailContainer={<ProfileDetailContainer userId={userId} />}
      userHeaderContainer={<UserHeaderContainer userId={userId} />}
    />
  );
}
