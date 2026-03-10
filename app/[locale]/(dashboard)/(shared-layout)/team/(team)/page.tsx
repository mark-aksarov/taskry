import {
  pageSearchParam,
  booleanSearchParam,
  searchParamToArray,
  pageSizeSearchParam,
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
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { UserFiltersFormContainer } from "@/components/users/UserFiltersFormContainer";
import { CreatePositionProvider } from "@/components/position/CreatePositionContext";

const searchParamsSchema = z.object({
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
    <PageTransitionProvider>
      <CreateUserProvider createUser={createUser}>
        <CreatePositionProvider createPosition={createPosition}>
          <UsersPage
            totalFilteredUsers={totalFilteredUsers}
            selectedSortField={sort}
            filtersFormContainer={
              <UserFiltersFormContainer filters={filters} />
            }
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
    </PageTransitionProvider>
  );
}
