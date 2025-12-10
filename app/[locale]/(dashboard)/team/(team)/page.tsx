import { UsersPage } from "./UsersPage";
import { getUserCount } from "@/lib/queries/user";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { getPageParams } from "@/lib/utils/getPageParams";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";
import { UsersServerContainer } from "@/components/users/UsersServerContainer";
import { UserFiltersFormServerContainer } from "@/components/users/UserFiltersFormServerContainer";

export default async function AppUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  const params = await searchParams;
  const { page, pageSize } = getPageParams(params);

  const workspaceId = await getUserWorkspaceId();
  const count = await getUserCount({ workspaceId });

  if (!count) return <UsersPageEmpty />;

  return (
    <UsersPage
      page={page}
      pageSize={pageSize}
      UserFiltersFormContainer={UserFiltersFormServerContainer}
      UsersServerContainer={UsersServerContainer}
    />
  );
}
