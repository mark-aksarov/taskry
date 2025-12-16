import { z } from "zod";
import { UsersPage } from "./UsersPage";
import { getUserCount } from "@/lib/data/user";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UsersServerContainer } from "@/components/users/UsersServerContainer";
import { UserFiltersFormServerContainer } from "@/components/users/UserFiltersFormServerContainer";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
});

export default async function AppUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  // Authorization
  await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize } = searchParamsSchema.parse(rawParams);

  // Get count
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
