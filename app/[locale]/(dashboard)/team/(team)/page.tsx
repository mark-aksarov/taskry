import {
  pageSearchParam,
  booleanSearchParam,
  searchParamToArray,
  pageSizeSearchParam,
} from "@/lib/schemas/base";

import { z } from "zod";
import { UsersPage } from "./UsersPage";
import { userSortFields } from "@/lib/types";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { positionId } from "@/lib/schemas/position";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { getUserCount } from "@/lib/data/user/user.dal";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { createUser } from "@/lib/actions/user/createUser";
import { UsersContainer } from "@/components/users/UsersContainer";
import { createPosition } from "@/lib/actions/position/createPosition";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { UserFiltersFormContainer } from "@/components/users/UserFiltersFormContainer";

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

  // Get total count of users in the current workspace
  const totalCount = await getUserCount();
  const guestMode = await hasGuestRole();

  // Only the owner and guests can see the user menu item
  const isOwner = await hasOwnerRole();
  const showCreateNewUserMenuItem = isOwner || guestMode;

  if (!totalCount)
    return (
      <UsersPageEmpty
        showCreateNewUserMenuItem={showCreateNewUserMenuItem}
        guestMode={guestMode}
        createUser={createUser}
        createPosition={createPosition}
      />
    );

  // Only the owner and guests can see the user action menu trigger
  const showUserActionMenuTrigger = isOwner || guestMode;

  // Get total count of users based on filters and sorting
  const totalFilteredUsers = await getUserCount(filters);

  return (
    <PageTransitionProvider>
      <UsersPage
        guestMode={guestMode}
        showCreateNewUserMenuItem={showCreateNewUserMenuItem}
        totalFilteredUsers={totalFilteredUsers}
        selectedSortField={sort}
        filtersFormContainer={<UserFiltersFormContainer filters={filters} />}
        usersContainer={
          <UsersContainer
            showUserActionMenuTrigger={showUserActionMenuTrigger}
            page={page}
            pageSize={pageSize}
            sort={sort}
            filters={filters}
          />
        }
        createUser={createUser}
        createPosition={createPosition}
      />
    </PageTransitionProvider>
  );
}
