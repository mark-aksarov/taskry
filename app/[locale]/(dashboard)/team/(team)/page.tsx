import { UsersPage } from "./UsersPage";
import { getUserCount } from "@/lib/queries/user";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { getPageParams } from "@/lib/utils/getPageParams";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UsersServerContainer } from "@/components/users/UsersServerContainer";
import { UserFiltersFormServerContainer } from "@/components/users/UserFiltersFormServerContainer";

export default async function AppUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  await requireProtectedPage();

  const params = await searchParams;
  const { page, pageSize } = getPageParams(params);

  const count = await getUserCount();

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
