import { notFound } from "next/navigation";
import { getUser } from "@/lib/data/user/user.dal";
import { TeamProfilePage } from "./TeamProfilePage";
import { userId as userIdSchema } from "@/lib/schemas/user";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { canEditUserProfile } from "@/lib/utils/canEditUserProfile";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { UserDetailAltContainer } from "@/dashboard/users/UserDetailAltContainer";
import { UserDetailHeaderAltContainer } from "@/dashboard/users/UserDetailHeaderAltContainer";

export default async function AppTeamProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireFullAccess();

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

  const showUserActions = await canEditUserProfile({
    session,
    profileUserId: userId,
  });

  return (
    <TeamProfilePage
      user={user}
      showUserActions={showUserActions}
      userDetailContainer={<UserDetailAltContainer userId={user.id} />}
      userDetailHeaderContainer={
        <UserDetailHeaderAltContainer userId={user.id} />
      }
      searchContainer={<LinkSearchContainer pathname="/tasks" />}
    />
  );
}
