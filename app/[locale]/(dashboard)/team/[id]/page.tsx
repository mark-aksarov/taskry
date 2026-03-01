import { notFound } from "next/navigation";
import { TeamProfilePage } from "./TeamProfilePage";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { getUserSummary } from "@/lib/data/user/user.dal";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { userId as userIdSchema } from "@/lib/schemas/user";
import { ProfileActions } from "@/components/users/ProfileActions";
import { changePassword } from "@/lib/actions/user/changePassword";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { CurrentUserProvider } from "@/components/common/CurrentUserContext";
import { EditUserFormContainer } from "@/components/users/EditUserFormContainer";
import { ProfileDetailContainer } from "@/components/users/ProfileDetailContainer";
import { UpdateUserTransitionProvider } from "@/components/users/UpdateUserTransitionContext";
import { ChangePasswordTransitionProvider } from "@/components/users/ChangePasswordTransitionContext";

export default async function AppProfilePage({
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

  // This data is required to determine the user's role
  // and render the UI accordingly on the client side.
  const isOwner = await hasOwnerRole();
  const isGuest = await hasGuestRole();

  const currentUserContextValue = {
    isGuest,
    isOwner,
    userId: session.user.id,
  };

  // Show user actions if the user is the owner, guest, or the current user
  const showUserActions = isOwner || isGuest || session.user.id === userId;

  return (
    <CurrentUserProvider value={currentUserContextValue}>
      <TeamProfilePage
        userActions={
          showUserActions && (
            <UpdateUserTransitionProvider>
              <ChangePasswordTransitionProvider>
                <ProfileActions
                  changePassword={changePassword}
                  deleteUser={deleteUser}
                  userId={userId}
                  userFullName={userSummary.fullName}
                  editUserFormContainer={
                    <EditUserFormContainer userId={userId} />
                  }
                />
              </ChangePasswordTransitionProvider>
            </UpdateUserTransitionProvider>
          )
        }
        profileDetailContainer={<ProfileDetailContainer userId={userId} />}
        userHeaderContainer={<UserHeaderContainer userId={userId} />}
      />
    </CurrentUserProvider>
  );
}
