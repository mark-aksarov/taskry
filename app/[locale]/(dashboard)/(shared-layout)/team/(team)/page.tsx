import {
  pageSearchParam,
  booleanSearchParam,
  searchParamToArray,
  pageSizeSearchParam,
  searchQueryParam,
} from "@/lib/schemas/base";

import { z } from "zod";
import { UsersPage } from "./UsersPage";
import { userSortFields } from "@/lib/types";
import { positionId } from "@/lib/schemas/position";
import { UsersPageModals } from "./UsersPageModals";
import { getUserList } from "@/lib/data/user/user.dal";
import { UsersPageProviders } from "./UsersPageProviders";
import { UsersContainer } from "@/components/users/UsersContainer";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";

const searchParamsSchema = z.object({
  query: searchQueryParam,
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  hasNoActiveTasks: booleanSearchParam,
  hasActiveTasks: booleanSearchParam,
  hasOverdueTasks: booleanSearchParam,
  sort: z.enum(userSortFields).catch("fullName"),
  positionIds: z.preprocess(
    searchParamToArray,
    z.array(positionId).optional().catch(undefined),
  ),
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

  // Get users for the current page based on filters and sorting
  const { items: users, totalCount: totalFilteredUsers } = await getUserList({
    page,
    pageSize,
    sort,
    filters,
  });

  return (
    <UsersPageProviders filters={filters}>
      <UsersPage
        totalFilteredUsers={totalFilteredUsers}
        selectedSortField={sort}
        usersContainer={
          <UsersContainer
            users={users}
            totalCount={totalFilteredUsers}
            page={page}
            pageSize={pageSize}
          />
        }
      />

      <UsersPageModals />
    </UsersPageProviders>
  );
}
