import { z } from "zod";
import { UsersPage } from "./UsersPage";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { arrayParam } from "@/lib/utils/arrayParam";
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
  hasNoActiveTasks: z
    .preprocess((val) => val === "true", z.boolean())
    .optional()
    .catch(undefined),
  hasActiveTasks: z
    .preprocess((val) => val === "true", z.boolean())
    .optional()
    .catch(undefined),
  hasOverdueTasks: z
    .preprocess((val) => val === "true", z.boolean())
    .optional()
    .catch(undefined),
  position: arrayParam(z.coerce.number()).catch([]),
});

export default async function AppUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Authorization
  await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize, sort, ...filters } =
    searchParamsSchema.parse(rawParams);

  // Get count
  const count = await getUserCount();

  if (!count) return <UsersPageEmpty />;

  return (
    <UsersPage
      page={page}
      pageSize={pageSize}
      sort={sort}
      filters={filters}
      createPositionAction={createPosition}
      UserFiltersFormContainer={UserFiltersFormServerContainer}
      UsersServerContainer={UsersServerContainer}
      deleteUsersAction={deleteUsers}
    />
  );
}
