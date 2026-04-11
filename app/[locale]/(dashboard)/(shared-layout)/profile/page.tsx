import { notFound } from "next/navigation";
import { ProfilePage } from "./ProfilePage";
import { getUserFormData } from "@/lib/data/user/user.dal";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UpdateUserBioModal } from "@/components/users/UpdateUserBioModal";
import { DeleteUserProvider } from "@/components/users/DeleteUserProvider";
import { ChangePasswordModal } from "@/components/users/ChangePasswordModal";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { DeleteUserImageModal } from "@/components/users/DeleteUserImageModal";
import { UpdateUserImageModal } from "@/components/users/UpdateUserImageModal";
import { UpdateUserBioProvider } from "@/components/users/UpdateUserBioProvider";
import { DeleteUserDetailModal } from "@/components/users/DeleteUserDetailModal";
import { ChangePasswordProvider } from "@/components/users/ChangePasswordProvider";
import { UserDetailAltContainer } from "@/components/users/UserDetailAltContainer";
import { UpdateUserFullNameModal } from "@/components/users/UpdateUserFullNameModal";
import { UpdateUserImageProvider } from "@/components/users/UpdateUserImageProvider";
import { ClearUserImageUrlProvider } from "@/components/users/ClearUserImageUrlProvider";
import { UpdateUserFullNameProvider } from "@/components/users/UpdateUserFullNameProvider";
import { UpdateUserImageFileProvider } from "@/components/users/UpdateUserImageFileContext";
import { UserDetailHeaderAltContainer } from "@/components/users/UserDetailHeaderAltContainer";

export default async function AppProfilePage() {
  const session = await requireProtectedPage();

  const userId = session.user.id;
  const userFormData = await getUserFormData(userId);

  if (!userFormData) {
    notFound();
  }

  return (
    <UpdateUserImageFileProvider>
      <UpdateUserImageProvider>
        <ClearUserImageUrlProvider>
          <DeleteUserProvider>
            <UpdateUserFullNameProvider>
              <UpdateUserBioProvider>
                <ChangePasswordProvider>
                  <ProfilePage
                    userId={userId}
                    userDetailContainer={
                      <UserDetailAltContainer userId={userId} />
                    }
                    userDetailHeaderContainer={
                      <UserDetailHeaderAltContainer userId={userId} />
                    }
                  />

                  <DeleteUserDetailModal
                    userId={userId}
                    userFullName={userFormData.fullName}
                  />

                  <UpdateUserImageModal userId={userId} />

                  <DeleteUserImageModal
                    userId={userId}
                    userFullName={userFormData.fullName}
                  />

                  <UpdateUserFullNameModal
                    userId={userId}
                    userFullName={userFormData.fullName}
                  />

                  <UpdateUserBioModal
                    userId={userId}
                    userBio={userFormData.bio}
                  />

                  <ChangePasswordModal userId={userId} />

                  <TaskSearchModal
                    searchContainer={<LinkSearchContainer pathname="/tasks" />}
                  />
                </ChangePasswordProvider>
              </UpdateUserBioProvider>
            </UpdateUserFullNameProvider>
          </DeleteUserProvider>
        </ClearUserImageUrlProvider>
      </UpdateUserImageProvider>
    </UpdateUserImageFileProvider>
  );
}
