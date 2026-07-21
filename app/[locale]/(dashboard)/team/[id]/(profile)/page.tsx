import { notFound } from "next/navigation";
import { getUser } from "@/lib/data/user/user.dal";
import { TeamProfilePage } from "./TeamProfilePage";
import { userId as userIdSchema } from "@/lib/schemas/user";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { ResetPasswordModal } from "@/dashboard/users/ResetPasswordModal";
import { UpdateUserBioModal } from "@/dashboard/users/UpdateUserBioModal";
import { DeleteUserProvider } from "@/dashboard/users/DeleteUserProvider";
import { ChangePasswordModal } from "@/dashboard/users/ChangePasswordModal";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { UpdateUserImageModal } from "@/dashboard/users/UpdateUserImageModal";
import { DeleteUserImageModal } from "@/dashboard/users/DeleteUserImageModal";
import { UpdateUserBioProvider } from "@/dashboard/users/UpdateUserBioProvider";
import { DeleteUserDetailModal } from "@/dashboard/users/DeleteUserDetailModal";
import { UpdateUserAddressModal } from "@/dashboard/users/UpdateUserAddressModal";
import { ChangePasswordProvider } from "@/dashboard/users/ChangePasswordProvider";
import { UserDetailAltContainer } from "@/dashboard/users/UserDetailAltContainer";
import { UpdateUserFullNameModal } from "@/dashboard/users/UpdateUserFullNameModal";
import { UpdateUserPositionModal } from "@/dashboard/users/UpdateUserPositionModal";
import { UpdateUserImageProvider } from "@/dashboard/users/UpdateUserImageProvider";
import { UpdateUserBirthdateModal } from "@/dashboard/users/UpdateUserBirthdateModal";
import { requireProtectedPageSession } from "@/lib/utils/requireProtectedPageSession";
import { UpdateUserPublicLinkModal } from "@/dashboard/users/UpdateUserPublicLinkModal";
import { ClearUserImageUrlProvider } from "@/dashboard/users/ClearUserImageUrlProvider";
import { UpdateUserAddressProvider } from "@/dashboard/users/UpdateUserAddressProvider";
import { UpdateUserFullNameProvider } from "@/dashboard/users/UpdateUserFullNameProvider";
import { UpdateUserPositionProvider } from "@/dashboard/users/UpdateUserPositionProvider";
import { UpdateUserPhoneNumberModal } from "@/dashboard/users/UpdateUserPhoneNumberModal";
import { UpdateUserImageFileProvider } from "@/dashboard/users/UpdateUserImageFileContext";
import { UpdateUserBirthdateProvider } from "@/dashboard/users/UpdateUserBirthdateProvider";
import { UserDetailHeaderAltContainer } from "@/dashboard/users/UserDetailHeaderAltContainer";
import { UpdateUserPublicLinkProvider } from "@/dashboard/users/UpdateUserPublicLinkProvider";
import { UpdateUserPhoneNumberProvider } from "@/dashboard/users/UpdateUserPhoneNumberProvider";
import { UpdateUserPositionFormContainer } from "@/dashboard/users/UpdateUserPositionFormContainer";
import { ResetPasswordProvider } from "@/dashboard/users/ResetPasswordProvider";

export default async function AppTeamProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireProtectedPageSession();

  // Validation
  const { id: rawUserId } = await params;

  const parsed = userIdSchema.safeParse(rawUserId);
  if (!parsed.success) {
    notFound();
  }
  const userId = parsed.data;

  // Get user  data
  const user = await getUser(userId);

  if (!user) {
    notFound();
  }

  // Show user actions if the user is the owner, guest, or the current user
  const isOwner = session.user.role === "owner";
  const isGuest = session.user.role === "guest";
  const showUserActions = isOwner || isGuest || session.user.id === userId;

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
                          <ResetPasswordProvider>
                            <ChangePasswordProvider>
                              <TeamProfilePage
                                showUserActions={showUserActions}
                                userId={userId}
                                userDetailContainer={
                                  <UserDetailAltContainer userId={userId} />
                                }
                                userDetailHeaderContainer={
                                  <UserDetailHeaderAltContainer
                                    userId={userId}
                                  />
                                }
                              />

                              <TaskSearchModal
                                searchContainer={
                                  <LinkSearchContainer pathname="/tasks" />
                                }
                              />

                              <ChangePasswordModal />
                              <ResetPasswordModal userId={userId} />

                              <DeleteUserDetailModal
                                userId={userId}
                                userFullName={user.fullName}
                              />

                              <UpdateUserBioModal
                                userId={userId}
                                userBio={user.bio}
                              />

                              <UpdateUserFullNameModal
                                userId={userId}
                                userFullName={user.fullName}
                              />

                              <UpdateUserPhoneNumberModal
                                userId={userId}
                                userPhoneNumber={user.phoneNumber}
                              />

                              <UpdateUserBirthdateModal
                                userId={userId}
                                userBirthdate={user.birthdate}
                              />

                              <UpdateUserAddressModal
                                userId={userId}
                                userAddress={user.address}
                              />

                              <UpdateUserPublicLinkModal
                                userId={userId}
                                userPublicLink={user.publicLink}
                              />

                              <UpdateUserPositionModal
                                updateUserPositionFormContainer={
                                  <UpdateUserPositionFormContainer
                                    userId={userId}
                                    positionId={user.positionId}
                                  />
                                }
                              />

                              <UpdateUserImageModal userId={userId} />

                              <DeleteUserImageModal
                                userId={userId}
                                userFullName={user.fullName}
                              />
                            </ChangePasswordProvider>
                          </ResetPasswordProvider>
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
