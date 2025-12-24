import { z } from "zod";
import { UsersPage } from "./UsersPage";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { getUserCount } from "@/lib/data/user/user.dal";
import { deleteUsers } from "@/lib/actions/user/deleteUsers";
import { createPosition } from "@/lib/actions/position/createPosition";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UsersServerContainer } from "@/components/users/UsersServerContainer";
import { UserFiltersFormServerContainer } from "@/components/users/UserFiltersFormServerContainer";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
  sort: z.enum(["fullName", "position"]).catch("fullName"),
});

export default async function AppUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string; sort?: string }>;
}) {
  // Authorization
  await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize, sort } = searchParamsSchema.parse(rawParams);

  // Get count
  const count = await getUserCount();

  if (!count) return <UsersPageEmpty />;

  return (
    <UsersPage
      page={page}
      pageSize={pageSize}
      sort={sort}
      createPositionAction={createPosition}
      UserFiltersFormContainer={UserFiltersFormServerContainer}
      UsersServerContainer={UsersServerContainer}
      deleteUsersAction={deleteUsers}
    />
  );
}
