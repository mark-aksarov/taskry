import { UsersPage } from "./UsersPage";
import { getUserList } from "@/lib/queries/user";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";
import { UsersServerContainer } from "@/components/users/UsersServerContainer";
import { UserFiltersFormServerContainer } from "@/components/users/UserFiltersFormServerContainer";

export default async function AppUsersPage() {
  const workspaceId = await getUserWorkspaceId();
  const users = await getUserList(workspaceId);

  if (!users.length) return <UsersPageEmpty />;

  return (
    <UsersPage
      UserFiltersFormContainer={UserFiltersFormServerContainer}
      UsersServerContainer={UsersServerContainer}
    />
  );
}
