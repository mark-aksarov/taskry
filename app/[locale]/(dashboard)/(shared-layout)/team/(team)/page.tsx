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
import { createUser } from "@/lib/actions/user/createUser";
import { UsersContainer } from "@/components/users/UsersContainer";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CreateUserProvider } from "@/components/users/CreateUserContext";
import { UserFiltersProvider } from "@/components/users/UserFiltersContext";
import { RouterSearchContainer } from "@/components/common/RouterSearchContainer";
import { CreatePositionProvider } from "@/components/position/CreatePositionProvider";
import { UserFiltersFormContainer } from "@/components/users/UserFiltersFormContainer";
import { CreatePositionModalProvider } from "@/components/position/CreatePositionModal";
import { UserPositionFiltersFormContainer } from "@/components/users/UserPositionFiltersFormContainer";

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
    <CreateUserProvider createUser={createUser}>
      <CreatePositionModalProvider>
        <CreatePositionProvider>
          <UserFiltersProvider filters={filters}>
            <UsersPage
              totalFilteredUsers={totalFilteredUsers}
              selectedSortField={sort}
              searchContainer={<RouterSearchContainer />}
              filtersFormContainer={<UserFiltersFormContainer />}
              positionFiltersFormContainer={
                <UserPositionFiltersFormContainer />
              }
              usersContainer={
                <UsersContainer
                  users={users}
                  totalCount={totalFilteredUsers}
                  page={page}
                  pageSize={pageSize}
                />
              }
            />
          </UserFiltersProvider>
        </CreatePositionProvider>
      </CreatePositionModalProvider>
    </CreateUserProvider>
  );
}
