import { ProfilePage } from "./ProfilePage";
import { updateUser } from "@/lib/actions/user/updateUser";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { changePassword } from "@/lib/actions/user/changePassword";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { DeleteUserProvider } from "@/components/users/DeleteUserContext";
import { UpdateUserProvider } from "@/components/users/UpdateUserContext";
import { UpdateUserFormContainer } from "@/components/users/UpdateUserFormContainer";
import { ChangePasswordProvider } from "@/components/users/ChangePasswordContext";
import { UserDetailAltContainer } from "@/components/users/UserDetailAltContainer";
import { UserDetailHeaderAltContainer } from "@/components/users/UserDetailHeaderAltContainer";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";

export default async function AppProfilePage() {
  const session = await requireProtectedPage();

  const userId = session.user.id;
  const userFullName = session.user.name;

  return (
    <UpdateUserProvider updateUser={updateUser}>
      <ChangePasswordProvider changePassword={changePassword}>
        <DeleteUserProvider deleteUser={deleteUser}>
          <ProfilePage
            userId={userId}
            userFullName={userFullName}
            searchContainer={<LinkSearchContainer pathname="/tasks" />}
            editUserFormContainer={<UpdateUserFormContainer userId={userId} />}
            userDetailContainer={<UserDetailAltContainer userId={userId} />}
            userDetailHeaderContainer={
              <UserDetailHeaderAltContainer userId={userId} />
            }
          />
        </DeleteUserProvider>
      </ChangePasswordProvider>
    </UpdateUserProvider>
  );
}
