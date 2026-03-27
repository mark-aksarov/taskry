import { ProfilePage } from "./ProfilePage";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { changePassword } from "@/lib/actions/user/changePassword";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { DeleteUserProvider } from "@/components/users/DeleteUserProvider";
import { UpdateUserProvider } from "@/components/users/UpdateUserProvider";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { ChangePasswordProvider } from "@/components/users/ChangePasswordContext";
import { UserDetailAltContainer } from "@/components/users/UserDetailAltContainer";
import { UpdateUserFormContainer } from "@/components/users/UpdateUserFormContainer";
import { UserDetailHeaderAltContainer } from "@/components/users/UserDetailHeaderAltContainer";

export default async function AppProfilePage() {
  const session = await requireProtectedPage();

  const userId = session.user.id;
  const userFullName = session.user.name;

  return (
    <UpdateUserProvider>
      <ChangePasswordProvider changePassword={changePassword}>
        <DeleteUserProvider>
          <ProfilePage
            userId={userId}
            userFullName={userFullName}
            searchContainer={<LinkSearchContainer pathname="/tasks" />}
            updateUserFormContainer={
              <UpdateUserFormContainer userId={userId} />
            }
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
