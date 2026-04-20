import { notFound } from "next/navigation";
import { ProfilePage } from "./ProfilePage";
import { getUserFormData } from "@/lib/data/user/user.dal";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UpdateUserBioModal } from "@/dashboard/users/UpdateUserBioModal";
import { DeleteUserProvider } from "@/dashboard/users/DeleteUserProvider";
import { ChangePasswordModal } from "@/dashboard/users/ChangePasswordModal";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { DeleteUserImageModal } from "@/dashboard/users/DeleteUserImageModal";
import { UpdateUserImageModal } from "@/dashboard/users/UpdateUserImageModal";
import { UpdateUserBioProvider } from "@/dashboard/users/UpdateUserBioProvider";
import { DeleteUserDetailModal } from "@/dashboard/users/DeleteUserDetailModal";
import { UpdateUserAddressModal } from "@/dashboard/users/UpdateUserAddressModal";
import { ChangePasswordProvider } from "@/dashboard/users/ChangePasswordProvider";
import { UserDetailAltContainer } from "@/dashboard/users/UserDetailAltContainer";
import { UpdateUserFullNameModal } from "@/dashboard/users/UpdateUserFullNameModal";
import { UpdateUserImageProvider } from "@/dashboard/users/UpdateUserImageProvider";
import { UpdateUserPositionModal } from "@/dashboard/users/UpdateUserPositionModal";
import { UpdateUserBirthdateModal } from "@/dashboard/users/UpdateUserBirthdateModal";
import { UpdateUserPublicLinkModal } from "@/dashboard/users/UpdateUserPublicLinkModal";
import { ClearUserImageUrlProvider } from "@/dashboard/users/ClearUserImageUrlProvider";
import { UpdateUserAddressProvider } from "@/dashboard/users/UpdateUserAddressProvider";
import { UpdateUserPositionProvider } from "@/dashboard/users/UpdateUserPositionProvider";
import { UpdateUserPhoneNumberModal } from "@/dashboard/users/UpdateUserPhoneNumberModal";
import { UpdateUserFullNameProvider } from "@/dashboard/users/UpdateUserFullNameProvider";
import { UpdateUserImageFileProvider } from "@/dashboard/users/UpdateUserImageFileContext";
import { UpdateUserBirthdateProvider } from "@/dashboard/users/UpdateUserBirthdateProvider";
import { UserDetailHeaderAltContainer } from "@/dashboard/users/UserDetailHeaderAltContainer";
import { UpdateUserPublicLinkProvider } from "@/dashboard/users/UpdateUserPublicLinkProvider";
import { UpdateUserPhoneNumberProvider } from "@/dashboard/users/UpdateUserPhoneNumberProvider";
import { UpdateUserPositionFormContainer } from "@/dashboard/users/UpdateUserPositionFormContainer";

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
                      <UpdateUserPublicLinkProvider>
                        <UpdateUserPositionProvider>
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

                            <UpdateUserPublicLinkModal
                              userId={userId}
                              userPublicLink={userFormData.publicLink}
                            />

                            <UpdateUserPositionModal
                              updateUserPositionFormContainer={
                                <UpdateUserPositionFormContainer
                                  userId={userId}
                                  positionId={userFormData.positionId}
                                />
                              }
                            />

                            <ChangePasswordModal userId={userId} />

                            <TaskSearchModal
                              searchContainer={
                                <LinkSearchContainer pathname="/tasks" />
                              }
                            />
                          </ChangePasswordProvider>
                        </UpdateUserPositionProvider>
                      </UpdateUserPublicLinkProvider>
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
