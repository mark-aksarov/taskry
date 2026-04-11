import { notFound } from "next/navigation";
import { TeamProfilePage } from "./TeamProfilePage";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { userId as userIdSchema } from "@/lib/schemas/user";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { getUserDetail, getUserFormData } from "@/lib/data/user/user.dal";
import { UpdateUserBioModal } from "@/components/users/UpdateUserBioModal";
import { DeleteUserProvider } from "@/components/users/DeleteUserProvider";
import { ChangePasswordModal } from "@/components/users/ChangePasswordModal";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { UpdateUserImageModal } from "@/components/users/UpdateUserImageModal";
import { DeleteUserImageModal } from "@/components/users/DeleteUserImageModal";
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

export default async function AppTeamProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireProtectedPage();

  // Validation
  const { id: rawUserId } = await params;

  const parsed = userIdSchema.safeParse(rawUserId);
  if (!parsed.success) {
    notFound();
  }
  const userId = parsed.data;

  // Get user summary
  const userFormData = await getUserFormData(userId);

  if (!userFormData) {
    notFound();
  }

  // Show user actions if the user is the owner, guest, or the current user
  const isOwner = await hasOwnerRole();
  const isGuest = await hasGuestRole();
  const showUserActions = isOwner || isGuest || session.user.id === userId;

  return (
    <UpdateUserImageFileProvider>
      <UpdateUserImageProvider>
        <ClearUserImageUrlProvider>
          <DeleteUserProvider>
            <UpdateUserFullNameProvider>
              <UpdateUserBioProvider>
                <ChangePasswordProvider>
                  <TeamProfilePage
                    showUserActions={showUserActions}
                    userId={userId}
                    userDetailContainer={
                      <UserDetailAltContainer userId={userId} />
                    }
                    userDetailHeaderContainer={
                      <UserDetailHeaderAltContainer userId={userId} />
                    }
                  />

                  <TaskSearchModal
                    searchContainer={<LinkSearchContainer pathname="/tasks" />}
                  />

                  <ChangePasswordModal userId={userId} />

                  <DeleteUserDetailModal
                    userId={userId}
                    userFullName={userFormData.fullName}
                  />

                  <UpdateUserBioModal
                    userId={userId}
                    userBio={userFormData.bio}
                  />

                  <UpdateUserFullNameModal
                    userId={userId}
                    userFullName={userFormData.fullName}
                  />

                  <UpdateUserImageModal userId={userId} />

                  <DeleteUserImageModal
                    userId={userId}
                    userFullName={userFormData.fullName}
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
