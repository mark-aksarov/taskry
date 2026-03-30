import { ProfilePage } from "./ProfilePage";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { UpdateUserModal } from "@/components/users/UpdateUserModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { DeleteUserProvider } from "@/components/users/DeleteUserProvider";
import { UpdateUserProvider } from "@/components/users/UpdateUserProvider";
import { ChangePasswordModal } from "@/components/users/ChangePasswordModal";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { DeleteUserImageModal } from "@/components/users/DeleteUserImageModal";
import { UpdateUserImageModal } from "@/components/users/UpdateUserImageModal";
import { DeleteUserDetailModal } from "@/components/users/DeleteUserDetailModal";
import { ChangePasswordProvider } from "@/components/users/ChangePasswordProvider";
import { UserDetailAltContainer } from "@/components/users/UserDetailAltContainer";
import { UpdateUserFormContainer } from "@/components/users/UpdateUserFormContainer";
import { UpdateUserImageProvider } from "@/components/users/UpdateUserImageProvider";
import { ClearUserImageUrlProvider } from "@/components/users/ClearUserImageUrlProvider";
import { UpdateUserImageFileProvider } from "@/components/users/UpdateUserImageFileContext";
import { UserDetailHeaderAltContainer } from "@/components/users/UserDetailHeaderAltContainer";

export default async function AppProfilePage() {
  const session = await requireProtectedPage();

  const userId = session.user.id;
  const userFullName = session.user.name;

  return (
    <UpdateUserImageFileProvider>
      <UpdateUserImageProvider>
        <ClearUserImageUrlProvider>
          <DeleteUserProvider>
            <UpdateUserProvider>
              <ChangePasswordProvider>
                <ProfilePage
                  userId={userId}
                  userFullName={userFullName}
                  userDetailContainer={
                    <UserDetailAltContainer userId={userId} />
                  }
                  userDetailHeaderContainer={
                    <UserDetailHeaderAltContainer userId={userId} />
                  }
                />

                <UpdateUserModal
                  updateUserFormContainer={
                    <UpdateUserFormContainer userId={userId} />
                  }
                />

                <DeleteUserDetailModal
                  userId={userId}
                  userFullName={userFullName}
                />

                <UpdateUserImageModal userId={userId} />

                <DeleteUserImageModal
                  userId={userId}
                  userFullName={userFullName}
                />

                <ChangePasswordModal userId={userId} />

                <TaskSearchModal
                  searchContainer={<LinkSearchContainer pathname="/tasks" />}
                />
              </ChangePasswordProvider>
            </UpdateUserProvider>
          </DeleteUserProvider>
        </ClearUserImageUrlProvider>
      </UpdateUserImageProvider>
    </UpdateUserImageFileProvider>
  );
}
