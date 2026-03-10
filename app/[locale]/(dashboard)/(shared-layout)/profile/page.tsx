import { ProfilePage } from "./ProfilePage";
import { updateUser } from "@/lib/actions/user/updateUser";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { changePassword } from "@/lib/actions/user/changePassword";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { DeleteUserProvider } from "@/components/users/DeleteUserContext";
import { UpdateUserProvider } from "@/components/users/UpdateUserContext";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { EditUserFormContainer } from "@/components/users/EditUserFormContainer";
import { ChangePasswordProvider } from "@/components/users/ChangePasswordContext";
import { ProfileDetailContainer } from "@/components/users/ProfileDetailContainer";

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
            editUserFormContainer={<EditUserFormContainer userId={userId} />}
            profileDetailContainer={<ProfileDetailContainer userId={userId} />}
            userHeaderContainer={<UserHeaderContainer userId={userId} />}
          />
        </DeleteUserProvider>
      </ChangePasswordProvider>
    </UpdateUserProvider>
  );
}
