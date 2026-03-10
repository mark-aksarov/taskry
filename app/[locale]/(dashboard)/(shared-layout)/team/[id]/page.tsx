import { notFound } from "next/navigation";
import { TeamProfilePage } from "./TeamProfilePage";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { getUserSummary } from "@/lib/data/user/user.dal";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { updateUser } from "@/lib/actions/user/updateUser";
import { userId as userIdSchema } from "@/lib/schemas/user";
import { changePassword } from "@/lib/actions/user/changePassword";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { DeleteUserProvider } from "@/components/users/DeleteUserContext";
import { UpdateUserProvider } from "@/components/users/UpdateUserContext";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { EditUserFormContainer } from "@/components/users/EditUserFormContainer";
import { ProfileDetailContainer } from "@/components/users/ProfileDetailContainer";
import { ChangePasswordProvider } from "@/components/users/ChangePasswordContext";

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
    <UpdateUserProvider updateUser={updateUser}>
      <ChangePasswordProvider changePassword={changePassword}>
        <DeleteUserProvider deleteUser={deleteUser}>
          <TeamProfilePage
            showUserActions={showUserActions}
            userId={userId}
            userFullName={userSummary.fullName}
            profileDetailContainer={<ProfileDetailContainer userId={userId} />}
            userHeaderContainer={<UserHeaderContainer userId={userId} />}
            editUserFormContainer={<EditUserFormContainer userId={userId} />}
          />
        </DeleteUserProvider>
      </ChangePasswordProvider>
    </UpdateUserProvider>
  );
}
