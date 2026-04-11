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
import { UpdateUserAddressModal } from "@/components/users/UpdateUserAddressModal";
import { ChangePasswordProvider } from "@/components/users/ChangePasswordProvider";
import { UserDetailAltContainer } from "@/components/users/UserDetailAltContainer";
import { UpdateUserFullNameModal } from "@/components/users/UpdateUserFullNameModal";
import { UpdateUserImageProvider } from "@/components/users/UpdateUserImageProvider";
import { UpdateUserBirthdateModal } from "@/components/users/UpdateUserBirthdateModal";
import { ClearUserImageUrlProvider } from "@/components/users/ClearUserImageUrlProvider";
import { UpdateUserAddressProvider } from "@/components/users/UpdateUserAddressProvider";
import { UpdateUserPhoneNumberModal } from "@/components/users/UpdateUserPhoneNumberModal";
import { UpdateUserFullNameProvider } from "@/components/users/UpdateUserFullNameProvider";
import { UpdateUserImageFileProvider } from "@/components/users/UpdateUserImageFileContext";
import { UpdateUserBirthdateProvider } from "@/components/users/UpdateUserBirthdateProvider";
import { UserDetailHeaderAltContainer } from "@/components/users/UserDetailHeaderAltContainer";
import { UpdateUserPhoneNumberProvider } from "@/components/users/UpdateUserPhoneNumberProvider";

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
                <UpdateUserPhoneNumberProvider>
                  <UpdateUserBirthdateProvider>
                    <UpdateUserAddressProvider>
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

                        <UpdateUserPhoneNumberModal
                          userId={userId}
                          userPhoneNumber={userFormData.phoneNumber}
                        />

                        <UpdateUserBirthdateModal
                          userId={userId}
                          userBirthdate={userFormData.birthdate}
                        />

                        <UpdateUserAddressModal
                          userId={userId}
                          userAddress={userFormData.address}
                        />

                        <ChangePasswordModal userId={userId} />

                        <TaskSearchModal
                          searchContainer={
                            <LinkSearchContainer pathname="/tasks" />
                          }
                        />
                      </ChangePasswordProvider>
                    </UpdateUserAddressProvider>
                  </UpdateUserBirthdateProvider>
                </UpdateUserPhoneNumberProvider>
              </UpdateUserBioProvider>
            </UpdateUserFullNameProvider>
          </DeleteUserProvider>
        </ClearUserImageUrlProvider>
      </UpdateUserImageProvider>
    </UpdateUserImageFileProvider>
  );
}
