import { TeamProfilePage } from "./TeamProfilePage";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { ProfileActions } from "@/components/users/ProfileActions";
import { changePassword } from "@/lib/actions/user/changePassword";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ChangePasswordForm } from "@/components/users/ChangePasswordForm";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { EditUserFormContainer } from "@/components/users/EditUserFormContainer";
import { ProfileDetailContainer } from "@/components/users/ProfileDetailContainer";

export default async function AppProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireProtectedPage();

  const { id: userId } = await params;

  const isOwner = await hasOwnerRole();
  const guestMode = await hasGuestRole();

  const isAuthUser = session?.user.id === userId;
  const showUserActions = isOwner || guestMode || isAuthUser;

  return (
    <TeamProfilePage
      userActions={
        showUserActions ? (
          <ProfileActions
            guestMode={guestMode}
            changePasswordForm={
              <ChangePasswordForm
                changePassword={changePassword}
                userId={userId}
              />
            }
            editUserFormContainer={<EditUserFormContainer userId={userId} />}
          />
        ) : null
      }
      profileDetailContainer={<ProfileDetailContainer userId={userId} />}
      userHeaderContainer={<UserHeaderContainer userId={userId} />}
    />
  );
}
