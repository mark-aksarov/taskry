import { notFound } from "next/navigation";
import { TeamProfilePage } from "./TeamProfilePage";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { getUserSummary } from "@/lib/data/user/user.dal";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { userId as userIdSchema } from "@/lib/schemas/user";
import { changePassword } from "@/lib/actions/user/changePassword";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { DeleteUserProvider } from "@/components/users/DeleteUserContext";
import { UpdateUserProvider } from "@/components/users/UpdateUserProvider";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { UpdateUserFormContainer } from "@/components/users/UpdateUserFormContainer";
import { ChangePasswordProvider } from "@/components/users/ChangePasswordContext";
import { UserDetailAltContainer } from "@/components/users/UserDetailAltContainer";
import { UserDetailHeaderAltContainer } from "@/components/users/UserDetailHeaderAltContainer";

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

  // Show user actions if the user is the owner, guest, or the current user
  const isOwner = await hasOwnerRole();
  const isGuest = await hasGuestRole();
  const showUserActions = isOwner || isGuest || session.user.id === userId;

  return (
    <UpdateUserProvider>
      <ChangePasswordProvider changePassword={changePassword}>
        <DeleteUserProvider deleteUser={deleteUser}>
          <TeamProfilePage
            showUserActions={showUserActions}
            userId={userId}
            userFullName={userSummary.fullName}
            searchContainer={<LinkSearchContainer pathname="/tasks" />}
            userDetailContainer={<UserDetailAltContainer userId={userId} />}
            userDetailHeaderContainer={
              <UserDetailHeaderAltContainer userId={userId} />
            }
            updateUserFormContainer={
              <UpdateUserFormContainer userId={userId} />
            }
          />
        </DeleteUserProvider>
      </ChangePasswordProvider>
    </UpdateUserProvider>
  );
}
