import { notFound } from "next/navigation";
import { TeamProfilePage } from "./TeamProfilePage";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { getUserSummary } from "@/lib/data/user/user.dal";
import { userId as userIdSchema } from "@/lib/schemas/user";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { UpdateUserModal } from "@/components/users/UpdateUserModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { DeleteUserProvider } from "@/components/users/DeleteUserProvider";
import { UpdateUserProvider } from "@/components/users/UpdateUserProvider";
import { ChangePasswordModal } from "@/components/users/ChangePasswordModal";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { UpdateUserImageModal } from "@/components/users/UpdateUserImageModal";
import { DeleteUserImageModal } from "@/components/users/DeleteUserImageModal";
import { DeleteUserDetailModal } from "@/components/users/DeleteUserDetailModal";
import { ChangePasswordProvider } from "@/components/users/ChangePasswordProvider";
import { UserDetailAltContainer } from "@/components/users/UserDetailAltContainer";
import { UpdateUserFormContainer } from "@/components/users/UpdateUserFormContainer";
import { UpdateUserImageProvider } from "@/components/users/UpdateUserImageProvider";
import { ClearUserImageUrlProvider } from "@/components/users/ClearUserImageUrlProvider";
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
  const userSummary = await getUserSummary(userId);

  if (!userSummary) {
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
            <UpdateUserProvider>
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
                <UpdateUserModal
                  updateUserFormContainer={
                    <UpdateUserFormContainer userId={userId} />
                  }
                />
                <DeleteUserDetailModal
                  userId={userId}
                  userFullName={userSummary.fullName}
                />
                <UpdateUserImageModal userId={userId} />
                <DeleteUserImageModal
                  userId={userId}
                  userFullName={userSummary.fullName}
                />
              </ChangePasswordProvider>
            </UpdateUserProvider>
          </DeleteUserProvider>
        </ClearUserImageUrlProvider>
      </UpdateUserImageProvider>
    </UpdateUserImageFileProvider>
  );
}
