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
import { getUserCount } from "@/lib/data/user/user.dal";
import { createUser } from "@/lib/actions/user/createUser";
import { UsersContainer } from "@/components/users/UsersContainer";
import { createPosition } from "@/lib/actions/position/createPosition";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CreateUserProvider } from "@/components/users/CreateUserContext";
import { RouterSearchContainer } from "@/components/common/RouterSearchContainer";
import { CreatePositionProvider } from "@/components/position/CreatePositionContext";
import { UserFiltersFormContainer } from "@/components/users/UserFiltersFormContainer";
import { UserPositionFiltersFormContainer } from "@/components/users/UserPositionFiltersFormContainer";

const searchParamsSchema = z.object({
  query: searchQueryParam,
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  hasNoActiveTasks: booleanSearchParam,
  hasActiveTasks: booleanSearchParam,
  hasOverdueTasks: booleanSearchParam,
  sort: z.enum(userSortFields).catch("fullName"),
  position: z.preprocess(
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

  // Get total count of users based on filters and sorting
  const totalFilteredUsers = await getUserCount(filters);

  return (
    <CreateUserProvider createUser={createUser}>
      <CreatePositionProvider createPosition={createPosition}>
        <UsersPage
          totalFilteredUsers={totalFilteredUsers}
          selectedSortField={sort}
          searchContainer={<RouterSearchContainer />}
          filtersFormContainer={<UserFiltersFormContainer filters={filters} />}
          positionFiltersFormContainer={<UserPositionFiltersFormContainer />}
          usersContainer={
            <UsersContainer
              page={page}
              pageSize={pageSize}
              sort={sort}
              filters={filters}
            />
          }
        />
      </CreatePositionProvider>
    </CreateUserProvider>
  );
}
