import { ProfilePage } from "./ProfilePage";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { changePassword } from "@/lib/actions/user/changePassword";
import { ProfileActions } from "@/components/users/ProfileActions";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { CurrentUserProvider } from "@/components/common/CurrentUserContext";
import { EditUserFormContainer } from "@/components/users/EditUserFormContainer";
import { ProfileDetailContainer } from "@/components/users/ProfileDetailContainer";
import { ChangePasswordTransitionProvider } from "@/components/users/ChangePasswordTransitionContext";
import { UpdateUserTransitionProvider } from "@/components/users/UpdateUserTransitionContext";

export default async function AppProfilePage() {
  const session = await requireProtectedPage();

  // This data is required to determine the user's role
  // and render the UI accordingly on the client side.
  const currentUserContextValue = {
    isGuest: await hasGuestRole(),
    isOwner: await hasOwnerRole(),
    userId: session.user.id,
  };

  return (
    <CurrentUserProvider value={currentUserContextValue}>
      <ProfilePage
        profileActions={
          <UpdateUserTransitionProvider>
            <ChangePasswordTransitionProvider>
              <ProfileActions
                userId={session.user.id}
                userFullName={session.user.name}
                changePassword={changePassword}
                deleteUser={deleteUser}
                editUserFormContainer={
                  <EditUserFormContainer userId={session.user.id} />
                }
              />
            </ChangePasswordTransitionProvider>
          </UpdateUserTransitionProvider>
        }
        profileDetailContainer={
          <ProfileDetailContainer userId={session.user.id} />
        }
        userHeaderContainer={<UserHeaderContainer userId={session.user.id} />}
      />
    </CurrentUserProvider>
  );
}
