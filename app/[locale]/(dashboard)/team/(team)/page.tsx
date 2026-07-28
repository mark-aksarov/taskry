import {
  pageSearchParam,
  booleanSearchParam,
  searchParamToArray,
  pageSizeSearchParam,
  searchQueryParam,
} from "@/lib/schemas/base";

import { z } from "zod";
import { TeamPage } from "./TeamPage";
import { userSortFields } from "@/lib/types";
import { positionId } from "@/lib/schemas/position";
import { getUserList } from "@/lib/data/user/user.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { getPositionCount } from "@/lib/data/position/position.dal";
import { UserGridContainer } from "@/dashboard/users/UserGridContainer";
import { RouterSearchContainer } from "@/dashboard/common/RouterSearchContainer";
import { UserFiltersFormContainer } from "@/dashboard/users/UserFiltersFormContainer";
import { UserPositionFiltersFormContainer } from "@/dashboard/users/UserPositionFiltersFormContainer";

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

export default async function AppTeamPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Authorization
  await requireFullAccess();

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

  // Show position filters only when positions exist
  const positionCount = await getPositionCount();

  return (
    <TeamPage
      page={page}
      pageSize={pageSize}
      positionCount={positionCount}
      totalFilteredUsers={totalFilteredUsers}
      filters={filters}
      selectedSortField={sort}
      userGrid={<UserGridContainer users={users} />}
      searchContainer={<RouterSearchContainer />}
      userFiltersFormContainer={<UserFiltersFormContainer />}
      userPositionFiltersFormContainer={<UserPositionFiltersFormContainer />}
    />
  );
}
