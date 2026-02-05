import { TeamProfilePage } from "./TeamProfilePage";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { ProfileActions } from "@/components/users/ProfileActions";
import { changePassword } from "@/lib/actions/user/changePassword";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ChangePasswordForm } from "@/components/users/ChangePasswordForm";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { ProfileDetailContainer } from "@/components/users/ProfileDetailContainer";

export default async function AppProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();

  const { id } = await params;

  const isOwner = await hasOwnerRole();
  const guestMode = await hasGuestRole();

  return (
    <TeamProfilePage
      userActions={
        (isOwner || guestMode) && (
          <ProfileActions
            guestMode={guestMode}
            changePasswordForm={
              <ChangePasswordForm changePassword={changePassword} userId={id} />
            }
          />
        )
      }
      profileDetailContainer={<ProfileDetailContainer userId={id} />}
      userHeaderContainer={<UserHeaderContainer userId={id} />}
    />
  );
}
