import { notFound } from "next/navigation";
import { userId } from "@/lib/schemas/user";
import { TeamProfilePage } from "./TeamProfilePage";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { ProfileActions } from "@/components/users/ProfileActions";
import { changePassword } from "@/lib/actions/user/changePassword";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { EditUserFormContainer } from "@/components/users/EditUserFormContainer";
import { ProfileDetailContainer } from "@/components/users/ProfileDetailContainer";

export default async function AppProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireProtectedPage();

  const { id: rawUserId } = await params;

  const parsed = userId.safeParse(rawUserId);
  if (!parsed.success) {
    notFound();
  }
  const id = parsed.data;

  const isOwner = await hasOwnerRole();
  const guestMode = await hasGuestRole();

  const isAuthUser = session?.user.id === id;
  const showUserActions = isOwner || guestMode || isAuthUser;

  return (
    <TeamProfilePage
      userActions={
        showUserActions ? (
          <ProfileActions
            guestMode={guestMode}
            changePassword={changePassword}
            userId={id}
            editUserFormContainer={<EditUserFormContainer userId={id} />}
          />
        ) : null
      }
      profileDetailContainer={<ProfileDetailContainer userId={id} />}
      userHeaderContainer={<UserHeaderContainer userId={id} />}
    />
  );
}
