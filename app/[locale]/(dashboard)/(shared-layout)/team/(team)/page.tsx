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
import { getUserList } from "@/lib/data/user/user.dal";
import { UsersContainer } from "@/dashboard/users/UsersContainer";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CreateUserProvider } from "@/dashboard/users/CreateUserProvider";
import { CreatePositionProvider } from "@/dashboard/position/CreatePositionProvider";
import { UserFiltersProvider } from "@/dashboard/users/UserFiltersContext";
import { UserSearchModal } from "@/dashboard/users/UserSearchModal";
import { CreateUserModal } from "@/dashboard/users/CreateUserModal";
import { RouterSearchContainer } from "@/dashboard/common/RouterSearchContainer";
import { CreatePositionModal } from "@/dashboard/position/CreatePositionModal";
import { UserFiltersModal } from "@/dashboard/users/UserFiltersModal";
import { UserPositionFiltersModal } from "@/dashboard/users/UserPositionFiltersModal";
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
    <CreateUserProvider>
      <CreatePositionProvider>
        <UserFiltersProvider filters={filters}>
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

          <UserSearchModal searchContainer={<RouterSearchContainer />} />
          <CreateUserModal />
          <CreatePositionModal />
          <UserFiltersModal
            filtersFormContainer={<UserFiltersFormContainer />}
          />
          <UserPositionFiltersModal
            filtersFormContainer={<UserPositionFiltersFormContainer />}
          />
        </UserFiltersProvider>
      </CreatePositionProvider>
    </CreateUserProvider>
  );
}
