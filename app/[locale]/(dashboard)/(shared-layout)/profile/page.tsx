import { ProfilePage } from "./ProfilePage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { DeleteUserProvider } from "@/components/users/DeleteUserProvider";
import { UpdateUserProvider } from "@/components/users/UpdateUserProvider";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { ChangePasswordProvider } from "@/components/users/ChangePasswordProvider";
import { UserDetailAltContainer } from "@/components/users/UserDetailAltContainer";
import { UpdateUserFormContainer } from "@/components/users/UpdateUserFormContainer";
import { UserDetailHeaderAltContainer } from "@/components/users/UserDetailHeaderAltContainer";

export default async function AppProfilePage() {
  const session = await requireProtectedPage();

  const userId = session.user.id;
  const userFullName = session.user.name;

  return (
    <UpdateUserProvider>
      <ChangePasswordProvider>
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
