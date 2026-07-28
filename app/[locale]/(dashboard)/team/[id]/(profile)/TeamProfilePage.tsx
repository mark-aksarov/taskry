import { useTranslations } from "next-intl";
import { Card } from "@/dashboard/common/Card";
import { UserDTO } from "@/lib/data/user/user.dto";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { BackButton } from "@/dashboard/common/BackButton";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { UserDetailCard } from "@/dashboard/users/UserDetailCard";
import { ProfileActions } from "@/dashboard/users/ProfileActions";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DeleteUserProvider } from "@/dashboard/users/DeleteUserContext";
import { UpdateUserBioModal } from "@/dashboard/users/UpdateUserBioModal";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { ChangePasswordModal } from "@/dashboard/users/ChangePasswordModal";
import { UserNavigationLarge } from "@/dashboard/users/UserNavigationLarge";
import { UpdateUserImageModal } from "@/dashboard/users/UpdateUserImageModal";
import { DeleteUserImageModal } from "@/dashboard/users/DeleteUserImageModal";
import { UserNavigationMobile } from "@/dashboard/users/UserNavigationMobile";
import { UpdateUserBioProvider } from "@/dashboard/users/UpdateUserBioContext";
import { DeleteUserDetailModal } from "@/dashboard/users/DeleteUserDetailModal";
import { ChangePasswordProvider } from "@/dashboard/users/ChangePasswordContext";
import { UpdateUserAddressModal } from "@/dashboard/users/UpdateUserAddressModal";
import { UpdateUserImageProvider } from "@/dashboard/users/UpdateUserImageContext";
import { UpdateUserFullNameModal } from "@/dashboard/users/UpdateUserFullNameModal";
import { UpdateUserPositionModal } from "@/dashboard/users/UpdateUserPositionModal";
import { UpdateUserBirthdateModal } from "@/dashboard/users/UpdateUserBirthdateModal";
import { ClearUserImageUrlProvider } from "@/dashboard/users/ClearUserImageUrlContext";
import { UpdateUserAddressProvider } from "@/dashboard/users/UpdateUserAddressContext";
import { UpdateUserPublicLinkModal } from "@/dashboard/users/UpdateUserPublicLinkModal";
import { UpdateUserFullNameProvider } from "@/dashboard/users/UpdateUserFullNameContext";
import { UpdateUserPositionProvider } from "@/dashboard/users/UpdateUserPositionContext";
import { UpdateUserPhoneNumberModal } from "@/dashboard/users/UpdateUserPhoneNumberModal";
import { UpdateUserImageFileProvider } from "@/dashboard/users/UpdateUserImageFileContext";
import { UpdateUserBirthdateProvider } from "@/dashboard/users/UpdateUserBirthdateContext";
import { UpdateUserPublicLinkProvider } from "@/dashboard/users/UpdateUserPublicLinkContext";
import { UpdateUserPhoneNumberProvider } from "@/dashboard/users/UpdateUserPhoneNumberContext";
import { UpdateUserPositionFormContainer } from "@/dashboard/users/UpdateUserPositionFormContainer";

interface TeamProfilePageProps {
  user: UserDTO;
  showUserActions: boolean;
  userDetailContainer: React.ReactNode;
  userDetailHeaderContainer: React.ReactNode;
  searchContainer: React.ReactNode;
}

export function TeamProfilePage({
  user,
  showUserActions,
  userDetailContainer,
  userDetailHeaderContainer,
  searchContainer,
}: TeamProfilePageProps) {
  const t = useTranslations("app.TeamProfilePage");

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
                            <DashboardContainer>
                              <UserDetailCard
                                userDetailContainer={userDetailContainer}
                                userDetailHeaderContainer={
                                  userDetailHeaderContainer
                                }
                                navigationLarge={
                                  <UserNavigationLarge
                                    userActions={
                                      showUserActions ? (
                                        <ProfileActions userId={user.id} />
                                      ) : undefined
                                    }
                                  />
                                }
                              />

                              <DashboardGrid className="md:hidden">
                                <ToolbarMobile
                                  firstSlot={
                                    <>
                                      <BackButton fallbackHref="/team" />
                                      <PageHeadingMobile>
                                        {t("heading")}
                                      </PageHeadingMobile>
                                    </>
                                  }
                                />

                                <ToolbarMobile
                                  firstSlot={<UserNavigationMobile />}
                                />

                                {userDetailHeaderContainer}

                                {showUserActions && (
                                  <Card className="p-1.5">
                                    <ProfileActions userId={user.id} />
                                  </Card>
                                )}

                                <Card>{userDetailContainer}</Card>
                              </DashboardGrid>
                            </DashboardContainer>

                            <TaskSearchModal
                              searchContainer={searchContainer}
                            />

                            <ChangePasswordModal />

                            <DeleteUserDetailModal
                              userId={user.id}
                              userFullName={user.fullName}
                            />

                            <UpdateUserBioModal
                              userId={user.id}
                              userBio={user.bio}
                            />

                            <UpdateUserFullNameModal
                              userId={user.id}
                              userFullName={user.fullName}
                            />

                            <UpdateUserPhoneNumberModal
                              userId={user.id}
                              userPhoneNumber={user.phoneNumber}
                            />

                            <UpdateUserBirthdateModal
                              userId={user.id}
                              userBirthdate={user.birthdate}
                            />

                            <UpdateUserAddressModal
                              userId={user.id}
                              userAddress={user.address}
                            />

                            <UpdateUserPublicLinkModal
                              userId={user.id}
                              userPublicLink={user.publicLink}
                            />

                            <UpdateUserPositionModal
                              updateUserPositionFormContainer={
                                <UpdateUserPositionFormContainer
                                  userId={user.id}
                                  positionId={user.positionId}
                                />
                              }
                            />

                            <UpdateUserImageModal userId={user.id} />

                            <DeleteUserImageModal
                              userId={user.id}
                              userFullName={user.fullName}
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
