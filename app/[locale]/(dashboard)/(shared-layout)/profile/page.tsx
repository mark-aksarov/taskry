import { ProfilePage } from "./ProfilePage";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { updateUser } from "@/lib/actions/user/updateUser";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { changePassword } from "@/lib/actions/user/changePassword";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { DeleteUserProvider } from "@/components/users/DeleteUserContext";
import { UpdateUserProvider } from "@/components/users/UpdateUserContext";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { CurrentUserProvider } from "@/components/common/CurrentUserContext";
import { EditUserFormContainer } from "@/components/users/EditUserFormContainer";
import { ChangePasswordProvider } from "@/components/users/ChangePasswordContext";
import { ProfileDetailContainer } from "@/components/users/ProfileDetailContainer";

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
      <UpdateUserProvider updateUser={updateUser}>
        <ChangePasswordProvider changePassword={changePassword}>
          <DeleteUserProvider deleteUser={deleteUser}>
            <ProfilePage
              userId={session.user.id}
              userFullName={session.user.name}
              editUserFormContainer={
                <EditUserFormContainer userId={session.user.id} />
              }
              profileDetailContainer={
                <ProfileDetailContainer userId={session.user.id} />
              }
              userHeaderContainer={
                <UserHeaderContainer userId={session.user.id} />
              }
            />
          </DeleteUserProvider>
        </ChangePasswordProvider>
      </UpdateUserProvider>
    </CurrentUserProvider>
  );
}
